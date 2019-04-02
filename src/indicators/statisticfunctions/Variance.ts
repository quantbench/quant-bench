import * as indicators from "../";
import { Queue } from "../Queue";

export class Variance extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "VAR";
  public static INDICATOR_DESCR: string = "Variance";
  public static TIMEPERIOD_DEFAULT: number = 5;
  public static TIMEPERIOD_MIN: number = 2;

  public timePeriod: number;

  private periodHistory: Queue<number>;
  private periodCounter: number;
  private rollingSum: number;
  private rollingSumOfSquares: number;

  private mean1: number;
  private mean2: number;
  private removed: number;

  constructor(timePeriod: number = Variance.TIMEPERIOD_DEFAULT) {
    super(Variance.INDICATOR_NAME, Variance.INDICATOR_DESCR);

    if (timePeriod < Variance.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          Variance.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.timePeriod = timePeriod;
    this.rollingSum = 0;
    this.rollingSumOfSquares = 0;
    this.periodCounter = 0;
    this.periodHistory = new Queue<number>();

    this.mean1 = 0;
    this.mean2 = 0;
    this.removed = 0;

    this.setLookBack(this.timePeriod - 1);
  }

  public receiveData(inputData: number): boolean {
    this.periodHistory.enqueue(inputData);

    if (this.periodCounter < this.timePeriod) {
      this.periodCounter += 1;
    }

    this.rollingSum += inputData;
    this.rollingSumOfSquares += inputData * inputData;

    if (this.periodCounter === this.timePeriod) {
      this.mean1 = this.rollingSum / this.timePeriod;
      this.mean2 = this.rollingSumOfSquares / this.timePeriod;
      this.removed = this.periodHistory.dequeue();
      this.rollingSum -= this.removed;
      this.rollingSumOfSquares -= this.removed * this.removed;

      this.setCurrentValue(this.mean2 - this.mean1 * this.mean1);
      this.setIsReady();
    }

    return this.isReady;
  }
}

export class VAR extends Variance {}
