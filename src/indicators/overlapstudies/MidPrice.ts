import * as indicators from "../";
import * as marketData from "../../data/market/";

export class MidPrice extends indicators.AbstractIndicator<
  marketData.IPriceBar
> {
  public static INDICATOR_NAME: string = "MIDPRICE";
  public static INDICATOR_DESCR: string = "Midpoint Price over period";
  public static TIMEPERIOD_DEFAULT: number = 14;
  public static TIMEPERIOD_MIN: number = 2;

  public timePeriod: number;
  private periodHistoryHigh: indicators.Queue<number>;
  private periodHistoryLow: indicators.Queue<number>;
  private highestValue: number;
  private lowestValue: number;

  constructor(timePeriod: number = MidPrice.TIMEPERIOD_DEFAULT) {
    super(MidPrice.INDICATOR_NAME, MidPrice.INDICATOR_DESCR);

    if (timePeriod < MidPrice.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          MidPrice.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.timePeriod = timePeriod;
    this.periodHistoryHigh = new indicators.Queue<number>();
    this.periodHistoryLow = new indicators.Queue<number>();
    this.highestValue = 0;
    this.lowestValue = 0;
    this.setLookBack(this.timePeriod - 1);
  }

  public receiveData(inputData: marketData.IPriceBar): boolean {
    this.periodHistoryHigh.enqueue(inputData.high);
    this.periodHistoryLow.enqueue(inputData.low);

    if (this.periodHistoryHigh.count > this.timePeriod) {
      this.periodHistoryHigh.dequeue();
      this.periodHistoryLow.dequeue();
    }

    if (this.periodHistoryHigh.count >= this.timePeriod) {
      this.highestValue = Number.MIN_VALUE;
      this.lowestValue = Number.MAX_VALUE;

      this.periodHistoryHigh.toArray().forEach((value: number) => {
        if (this.highestValue < value) {
          this.highestValue = value;
        }
      });

      this.periodHistoryLow.toArray().forEach((value: number) => {
        if (this.lowestValue > value) {
          this.lowestValue = value;
        }
      });

      this.setCurrentValue((this.highestValue + this.lowestValue) / 2.0);
    }

    return this.isReady;
  }
}

export class MIDPRICE extends MidPrice {}
