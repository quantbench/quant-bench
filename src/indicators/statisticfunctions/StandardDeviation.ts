import * as indicators from "../";

export class StandardDeviation extends indicators.AbstractIndicator<number> {
  public static INDICATOR_NAME: string = "STDDEV";
  public static INDICATOR_DESCR: string = "Standard Deviation";
  public static TIMEPERIOD_DEFAULT: number = 5;
  public static TIMEPERIOD_MIN: number = 2;

  public timePeriod: number;

  private variance: indicators.VAR;

  constructor(timePeriod: number = StandardDeviation.TIMEPERIOD_DEFAULT) {
    super(StandardDeviation.INDICATOR_NAME, StandardDeviation.INDICATOR_DESCR);

    if (timePeriod < StandardDeviation.TIMEPERIOD_MIN) {
      throw new Error(
        indicators.generateMinTimePeriodError(
          this.name,
          StandardDeviation.TIMEPERIOD_MIN,
          timePeriod
        )
      );
    }

    this.timePeriod = timePeriod;
    this.variance = new indicators.VAR(this.timePeriod);
    this.variance.on("data", (data: number) => this.receiveVarianceData(data));
    this.setLookBack(this.timePeriod - 1);
  }

  public receiveData(inputData: number): boolean {
    this.variance.receiveData(inputData);
    return this.isReady;
  }

  public receiveVarianceData(data: number) {
    this.setCurrentValue(Math.sqrt(this.variance.currentValue));
  }
}

export class STDDEV extends StandardDeviation {}
