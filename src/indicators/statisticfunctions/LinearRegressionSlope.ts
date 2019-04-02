import { LINEARREGBASE } from "./LinearRegressionBase";

export class LinearRegressionSlope extends LINEARREGBASE {
  public static INDICATOR_NAME: string = "LINEARREGSLOPE";
  public static INDICATOR_DESCR: string = "Linear Regression Intercept";
  public static TIMEPERIOD_DEFAULT: number = 14;

  constructor(timePeriod: number = LinearRegressionSlope.TIMEPERIOD_DEFAULT) {
    super(
      LinearRegressionSlope.INDICATOR_NAME,
      LinearRegressionSlope.INDICATOR_DESCR,
      timePeriod
    );
  }

  public calculateResult(slope: number, intercept: number): number {
    return slope;
  }
}

export class LINEARREGSLOPE extends LinearRegressionSlope {}
