import * as indicators from "../";

export class MinIndex extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "MinIndex";
  public static INDICATOR_DESCR: string =
    "Index of lowest value over a specified period";
  public static TIMEPERIOD_DEFAULT: number = 30;
  public static TIMEPERIOD_MIN: number = 2;

  public timePeriod: number;
  private periodHistory: indicators.Queue<number>;

  constructor(timePeriod: number = MinIndex.TIMEPERIOD_DEFAULT) {
    super(MinIndex.INDICATOR_NAME, MinIndex.INDICATOR_DESCR);

    if (timePeriod < MinIndex.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          MinIndex.TIMEPERIOD_MIN,
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
      this.setCurrentValue(indicators.getQueueMinIndex(this.periodHistory));
    }

    return this.isReady;
  }
}
