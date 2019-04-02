import * as indicators from "../";

export class Min extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "Min";
  public static INDICATOR_DESCR: string =
    "Lowest value over a specified period";
  public static TIMEPERIOD_DEFAULT: number = 30;
  public static TIMEPERIOD_MIN: number = 2;

  public timePeriod: number;
  private periodHistory: indicators.Queue<number>;
  private currentLow: number;

  constructor(timePeriod: number = Min.TIMEPERIOD_DEFAULT) {
    super(Min.INDICATOR_NAME, Min.INDICATOR_DESCR);

    if (timePeriod < Min.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          Min.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.timePeriod = timePeriod;
    this.currentLow = Number.MAX_VALUE;
    this.periodHistory = new indicators.Queue<number>();

    this.setLookBack(this.timePeriod - 1);
  }

  public receiveData(inputData: number): boolean {
    this.periodHistory.enqueue(inputData);

    if (this.periodHistory.count > this.timePeriod) {
      this.periodHistory.dequeue();

      this.currentLow = indicators.getQueueMin(this.periodHistory);

      this.setCurrentValue(this.currentLow);
    } else {
      if (inputData < this.currentLow) {
        this.currentLow = inputData;
      }

      if (this.periodHistory.count === this.timePeriod) {
        this.setCurrentValue(this.currentLow);
      }
    }
    return this.isReady;
  }
}
