import * as indicators from "../";
import * as marketData from "../../data/market/";

export class Aroon extends indicators.AbstractIndicatorBase<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "AROON";
  public static INDICATOR_DESCR: string = "Aroon";
  public static TIMEPERIOD_DEFAULT: number = 14;
  public static TIMEPERIOD_MIN: number = 2;

  public timePeriod: number;

  private aroonUpInternal: number;
  private aroonDownInternal: number;

  private aroonFactor: number;
  private periodCounter: number;
  private periodHighHistory: indicators.Queue<number>;
  private periodLowHistory: indicators.Queue<number>;

  private daysSinceHigh: number;
  private daysSinceLow: number;
  private highValue: number;
  private highIdx: number;
  private lowValue: number;
  private lowIdx: number;

  constructor(timePeriod: number = Aroon.TIMEPERIOD_DEFAULT) {
    super(Aroon.INDICATOR_NAME, Aroon.INDICATOR_DESCR);

    if (timePeriod < Aroon.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          Aroon.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.aroonUpInternal = 0;
    this.aroonDownInternal = 0;

    this.daysSinceHigh = 0;
    this.daysSinceLow = 0;
    this.highValue = 0;
    this.highIdx = 0;
    this.lowValue = 0;
    this.lowIdx = 0;

    this.timePeriod = timePeriod;
    this.periodCounter = (this.timePeriod + 1) * -1;
    this.periodHighHistory = new indicators.Queue<number>();
    this.periodLowHistory = new indicators.Queue<number>();
    this.aroonFactor = 100 / this.timePeriod;

    this.setLookBack(this.timePeriod);
  }

  public receiveData(inputData: marketData.IPriceBar): boolean {
    this.periodCounter += 1;
    this.periodHighHistory.enqueue(inputData.high);
    this.periodLowHistory.enqueue(inputData.low);

    if (this.periodHighHistory.count > 1 + this.lookback) {
      this.periodHighHistory.dequeue();
      this.periodLowHistory.dequeue();
    }

    if (this.periodCounter >= 0) {
      let aroonUp: number = 0;
      let aroonDown: number = 0;

      this.highValue = Number.MIN_VALUE;
      this.highIdx = -1;
      let i = 1 + this.lookback;

      this.periodHighHistory.toArray().forEach((value: number) => {
        i--;
        if (this.highValue <= value) {
          this.highValue = value;
          this.highIdx = i;
        }
      });

      this.daysSinceHigh = this.highIdx;

      this.lowValue = Number.MAX_VALUE;
      this.lowIdx = -1;
      i = 1 + this.lookback;

      this.periodLowHistory.toArray().forEach(value => {
        i--;
        if (this.lowValue >= value) {
          this.lowValue = value;
          this.lowIdx = i;
        }
      });

      this.daysSinceLow = this.lowIdx;

      aroonUp = this.aroonFactor * (this.lookback - this.daysSinceHigh);
      aroonDown = this.aroonFactor * (this.lookback - this.daysSinceLow);

      this.setCurrentValue(aroonUp, aroonDown);
    }

    return this.isReady;
  }

  public get aroonUp(): number {
    return this.aroonUpInternal;
  }

  public get aroonDown(): number {
    return this.aroonDownInternal;
  }

  protected setCurrentValue(aroonUp: number, aroonDown: number) {
    this.aroonDownInternal = aroonDown;
    this.aroonUpInternal = aroonUp;
    this.emit("data", this.aroonUp, this.aroonDown);
    this.setIsReady();
  }
}

export class AROON extends Aroon {}
