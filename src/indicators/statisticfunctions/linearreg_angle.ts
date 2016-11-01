import { LINEARREGBASE } from "./linearreg_base";

export class LINEARREGANGLE
    extends LINEARREGBASE {

    static INDICATOR_NAME: string = "LINEARREGANGLE";
    static INDICATOR_DESCR: string = "Linear Regression Angle";
    static TIMEPERIOD_DEFAULT: number = 14;

    constructor(timePeriod: number = LINEARREGANGLE.TIMEPERIOD_DEFAULT) {
        super(LINEARREGANGLE.INDICATOR_NAME, LINEARREGANGLE.INDICATOR_DESCR, timePeriod);
    }

    calculateResult(slope: number, intercept: number): number {
        return Math.atan(slope) * (180.0 / Math.PI);
    }
}
