import * as indicators from "../";

export class RateOfChangePercent extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "ROCP";
  public static INDICATOR_DESCR: string =
    "Rate of change Percentage: (price-prevPrice)/prevPrice";
  public static TIMEPERIOD_DEFAULT: number = 10;
  public static TIMEPERIOD_MIN: number = 1;

  public timePeriod: number;
  private periodHistory: indicators.Queue<number>;
  private periodCounter: number;
  private previousPrice: number;

  constructor(timePeriod: number = RateOfChangePercent.TIMEPERIOD_DEFAULT) {
    super(
      RateOfChangePercent.INDICATOR_NAME,
      RateOfChangePercent.INDICATOR_DESCR
    );

    if (timePeriod < RateOfChangePercent.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          RateOfChangePercent.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.previousPrice = 0;
    this.timePeriod = timePeriod;
    this.periodCounter = timePeriod * -1;
    this.periodHistory = new indicators.Queue<number>();
    this.setLookBack(this.timePeriod);
  }

  public receiveData(inputData: number): boolean {
    this.periodCounter += 1;
    this.periodHistory.enqueue(inputData);

    if (this.periodCounter > 0) {
      // RocP = (price - previousPrice)/previousPrice
      this.previousPrice = this.periodHistory.peek();

      if (this.previousPrice !== 0) {
        this.setCurrentValue(
          (inputData - this.previousPrice) / this.previousPrice
        );
      } else {
        this.setCurrentValue(0);
      }
    }

    if (this.periodHistory.count > this.timePeriod) {
      this.periodHistory.dequeue();
    }

    return this.isReady;
  }
}

export class ROCP extends RateOfChangePercent {}
