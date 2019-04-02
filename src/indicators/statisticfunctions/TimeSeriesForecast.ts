import { LINEARREGBASE } from "./LinearRegressionBase";

export class TimeSeriesForecast extends LINEARREGBASE {
  public static INDICATOR_NAME: string = "TSF";
  public static INDICATOR_DESCR: string = "Time Series Forecast";
  public static TIMEPERIOD_DEFAULT: number = 14;

  constructor(timePeriod: number = TimeSeriesForecast.TIMEPERIOD_DEFAULT) {
    super(
      TimeSeriesForecast.INDICATOR_NAME,
      TimeSeriesForecast.INDICATOR_DESCR,
      timePeriod
    );
  }

  public calculateResult(slope: number, intercept: number): number {
    return intercept + slope * this.timePeriod;
  }
}

export class TSF extends TimeSeriesForecast {}
