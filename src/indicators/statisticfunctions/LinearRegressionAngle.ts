import { LINEARREGBASE } from "./LinearRegressionBase";

export class LinearRegressionAngle
    extends LINEARREGBASE {

    static INDICATOR_NAME: string = "LINEARREGANGLE";
    static INDICATOR_DESCR: string = "Linear Regression Angle";
    static TIMEPERIOD_DEFAULT: number = 14;

    constructor(timePeriod: number = LinearRegressionAngle.TIMEPERIOD_DEFAULT) {
        super(LinearRegressionAngle.INDICATOR_NAME, LinearRegressionAngle.INDICATOR_DESCR, timePeriod);
    }

    calculateResult(slope: number, intercept: number): number {
        return Math.atan(slope) * (180.0 / Math.PI);
    }
}

export class LINEARREGANGLE extends LinearRegressionAngle {

}
