import * as indicators from "../";

export class MaxIndex extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "MaxIndex";
  public static INDICATOR_DESCR: string =
    "Index of highest value over a specified period";
  public static TIMEPERIOD_DEFAULT: number = 30;
  public static TIMEPERIOD_MIN: number = 2;

  public timePeriod: number;
  private periodHistory: indicators.Queue<number>;

  constructor(timePeriod: number = MaxIndex.TIMEPERIOD_DEFAULT) {
    super(MaxIndex.INDICATOR_NAME, MaxIndex.INDICATOR_DESCR);

    if (timePeriod < MaxIndex.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          MaxIndex.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.timePeriod = timePeriod;
    this.periodHistory = new indicators.Queue<number>();

    this.setLookBack(this.timePeriod - 1);
  }

  public receiveData(inputData: number): boolean {
    this.periodHistory.enqueue(inputData);

    if (this.periodHistory.count > this.timePeriod) {
      this.periodHistory.dequeue();
    }

    if (this.periodHistory.count >= this.timePeriod) {
      this.setCurrentValue(indicators.getQueueMaxIndex(this.periodHistory));
    }

    return this.isReady;
  }
}
