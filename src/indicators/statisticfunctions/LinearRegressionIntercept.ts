import { LINEARREGBASE } from "./LinearRegressionBase";

export class LinearRegressionIntercept extends LINEARREGBASE {
  public static INDICATOR_NAME: string = "LINEARREGINTERCEPT";
  public static INDICATOR_DESCR: string = "Linear Regression Intercept";
  public static TIMEPERIOD_DEFAULT: number = 14;

  constructor(
    timePeriod: number = LinearRegressionIntercept.TIMEPERIOD_DEFAULT
  ) {
    super(
      LinearRegressionIntercept.INDICATOR_NAME,
      LinearRegressionIntercept.INDICATOR_DESCR,
      timePeriod
    );
  }

  public calculateResult(slope: number, intercept: number): number {
    return intercept;
  }
}

export class LINEARREGINTERCEPT extends LinearRegressionIntercept {}
