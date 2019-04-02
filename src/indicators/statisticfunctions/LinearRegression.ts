import { LINEARREGBASE } from "./LinearRegressionBase";

export class LinearRegression extends LINEARREGBASE {
  public static INDICATOR_NAME: string = "LINEARREG";
  public static INDICATOR_DESCR: string = "Linear Regression";
  public static TIMEPERIOD_DEFAULT: number = 14;

  constructor(timePeriod: number = LinearRegression.TIMEPERIOD_DEFAULT) {
    super(
      LinearRegression.INDICATOR_NAME,
      LinearRegression.INDICATOR_DESCR,
      timePeriod
    );
  }

  public calculateResult(slope: number, intercept: number): number {
    return slope * (this.timePeriod - 1) + intercept;
  }
}

export class LINEARREG extends LinearRegression {}
