import { LINEARREGBASE } from "./LinearRegressionBase";

export class LinearRegressionAngle extends LINEARREGBASE {
  public static INDICATOR_NAME: string = "LINEARREGANGLE";
  public static INDICATOR_DESCR: string = "Linear Regression Angle";
  public static TIMEPERIOD_DEFAULT: number = 14;

  constructor(timePeriod: number = LinearRegressionAngle.TIMEPERIOD_DEFAULT) {
    super(
      LinearRegressionAngle.INDICATOR_NAME,
      LinearRegressionAngle.INDICATOR_DESCR,
      timePeriod
    );
  }

  public calculateResult(slope: number, intercept: number): number {
    return Math.atan(slope) * (180.0 / Math.PI);
  }
}

export class LINEARREGANGLE extends LinearRegressionAngle {}
