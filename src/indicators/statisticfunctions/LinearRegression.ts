import { LINEARREGBASE } from "./LinearRegressionBase";

export class LinearRegression
    extends LINEARREGBASE {

    static INDICATOR_NAME: string = "LINEARREG";
    static INDICATOR_DESCR: string = "Linear Regression";
    static TIMEPERIOD_DEFAULT: number = 14;

    constructor(timePeriod: number = LinearRegression.TIMEPERIOD_DEFAULT) {
        super(LinearRegression.INDICATOR_NAME, LinearRegression.INDICATOR_DESCR, timePeriod);
    }

    calculateResult(slope: number, intercept: number): number {
        return slope * (this.timePeriod - 1) + intercept;
    }
}

export class LINEARREG extends LinearRegression {

}
