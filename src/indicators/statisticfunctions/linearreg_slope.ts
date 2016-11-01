import { LINEARREGBASE } from "./linearreg_base";

export class LINEARREGSLOPE
    extends LINEARREGBASE {

    static INDICATOR_NAME: string = "LINEARREGSLOPE";
    static INDICATOR_DESCR: string = "Linear Regression Intercept";
    static TIMEPERIOD_DEFAULT: number = 14;

    constructor(timePeriod: number = LINEARREGSLOPE.TIMEPERIOD_DEFAULT) {
        super(LINEARREGSLOPE.INDICATOR_NAME, LINEARREGSLOPE.INDICATOR_DESCR, timePeriod);
    }

    calculateResult(slope: number, intercept: number): number {
        return slope;
    }
}
