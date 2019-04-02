import * as indicators from "../";

export class KaufmanAdaptiveMovingAverage extends indicators.AbstractIndicator<
  number
> {
  public static INDICATOR_NAME: string = "KAMA";
  public static INDICATOR_DESCR: string = "Kaufman Adaptive Moving Average";
  public static TIMEPERIOD_DEFAULT: number = 30;
  public static TIMEPERIOD_MIN: number = 2;
  public static epsilon = 0.00000000000001;

  public timePeriod: number;
  private periodHistory: indicators.Queue<number>;
  private periodCounter: number;
  private constantMax: number;
  private constantDiff: number;
  private sumROC: number;
  private periodROC: number;
  private previousClose: number;
  private previousKama: number;

  private closeMinusN: number;
  private closeMinusN1: number;
  private er: number;
  private sc: number;

  constructor(
    timePeriod: number = KaufmanAdaptiveMovingAverage.TIMEPERIOD_DEFAULT
  ) {
    super(
      KaufmanAdaptiveMovingAverage.INDICATOR_NAME,
      KaufmanAdaptiveMovingAverage.INDICATOR_DESCR
    );

    if (timePeriod < KaufmanAdaptiveMovingAverage.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          KaufmanAdaptiveMovingAverage.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.timePeriod = timePeriod;
    this.periodCounter = (timePeriod + 1) * -1;
    this.periodHistory = new indicators.Queue<number>();

    this.constantMax = 2.0 / (30.0 + 1.0);
    this.constantDiff = 2.0 / 3.0 - 2.0 / 31;

    this.sumROC = 0;
    this.periodROC = 0;
    this.previousClose = 0;
    this.previousKama = 0;

    this.closeMinusN = 0;
    this.closeMinusN1 = 0;
    this.er = 0;
    this.sc = 0;

    this.setLookBack(this.timePeriod);
  }

  public receiveData(inputData: number): boolean {
    this.periodCounter += 1;
    this.periodHistory.enqueue(inputData);

    if (this.periodCounter <= 0) {
      if (this.previousClose > 0) {
        this.sumROC += Math.abs(inputData - this.previousClose);
      }
    }

    if (this.periodCounter === 0) {
      this.er = 0;
      this.sc = 0;
      this.closeMinusN = this.periodHistory.peek();
      this.previousKama = this.previousClose;
      this.periodROC = inputData - this.closeMinusN;

      // calculate the efficiency ratio
      this.sumROC <= this.periodROC || this.isZero(this.sumROC)
        ? (this.er = 1)
        : (this.er = Math.abs(this.periodROC / this.sumROC));

      this.sc = this.er * this.constantDiff + this.constantMax;
      this.sc *= this.sc;
      this.previousKama =
        (inputData - this.previousKama) * this.sc + this.previousKama;

      this.setCurrentValue(this.previousKama);
    } else if (this.periodCounter > 0) {
      this.er = 0;
      this.sc = 0;
      this.closeMinusN = this.periodHistory.peek();
      this.closeMinusN1 = this.periodHistory.toArray()[1];

      this.periodROC = inputData - this.closeMinusN1;

      this.sumROC -= Math.abs(this.closeMinusN1 - this.closeMinusN);
      this.sumROC += Math.abs(inputData - this.previousClose);

      // calculate the efficiency ratio
      this.sumROC <= this.periodROC || this.isZero(this.sumROC)
        ? (this.er = 1)
        : (this.er = Math.abs(this.periodROC / this.sumROC));

      this.sc = this.er * this.constantDiff + this.constantMax;
      this.sc *= this.sc;
      this.previousKama =
        (inputData - this.previousKama) * this.sc + this.previousKama;

      this.setCurrentValue(this.previousKama);
    }

    this.previousClose = inputData;

    if (this.periodHistory.count > this.timePeriod + 1) {
      this.periodHistory.dequeue();
    }
    return this.isReady;
  }

  private isZero(value: number): boolean {
    return (
      -KaufmanAdaptiveMovingAverage.epsilon < value &&
      value < KaufmanAdaptiveMovingAverage.epsilon
    );
  }
}

export class KAMA extends KaufmanAdaptiveMovingAverage {}
