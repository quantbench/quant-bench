import * as indicators from "../";
import * as marketData from "../../data/market/";

export class WilliamsPercentR extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "WILLR";
  public static INDICATOR_DESCR: string = "Williams' %R";
  public static TIMEPERIOD_DEFAULT: number = 14;
  public static TIMEPERIOD_MIN: number = 2;

  public timePeriod: number;
  private periodHighHistory: indicators.Queue<number>;
  private periodLowHistory: indicators.Queue<number>;
  private periodCounter: number;
  private highestHigh: number;
  private lowestLow: number;

  constructor(timePeriod: number = WilliamsPercentR.TIMEPERIOD_DEFAULT) {
    super(WilliamsPercentR.INDICATOR_NAME, WilliamsPercentR.INDICATOR_DESCR);

    if (timePeriod < WilliamsPercentR.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          WilliamsPercentR.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.highestHigh = 0;
    this.lowestLow = 0;
    this.timePeriod = timePeriod;
    this.periodCounter = timePeriod * -1;
    this.periodHighHistory = new indicators.Queue<number>();
    this.periodLowHistory = new indicators.Queue<number>();
    this.setLookBack(this.timePeriod - 1);
  }

  public receiveData(inputData: marketData.IPriceBar): boolean {
    this.periodCounter += 1;
    this.periodHighHistory.enqueue(inputData.high);
    this.periodLowHistory.enqueue(inputData.low);

    if (this.periodCounter >= 0) {
      this.highestHigh = indicators.getQueueMax(this.periodHighHistory);
      this.lowestLow = indicators.getQueueMin(this.periodLowHistory);
      this.setCurrentValue(
        ((this.highestHigh - inputData.close) /
          (this.highestHigh - this.lowestLow)) *
          -100.0
      );
    }

    if (this.periodHighHistory.count >= this.timePeriod) {
      this.periodHighHistory.dequeue();
    }

    if (this.periodLowHistory.count >= this.timePeriod) {
      this.periodLowHistory.dequeue();
    }
    return this.isReady;
  }
}

export class WILLR extends WilliamsPercentR {}
