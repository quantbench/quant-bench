import { LINEARREGBASE } from "./linearreg_base";

export class LINEARREG
    extends LINEARREGBASE {

    static INDICATOR_NAME: string = "LINEARREG";
    static INDICATOR_DESCR: string = "Linear Regression";
    static TIMEPERIOD_DEFAULT: number = 14;

    constructor(timePeriod: number = LINEARREG.TIMEPERIOD_DEFAULT) {
        super(LINEARREG.INDICATOR_NAME, LINEARREG.INDICATOR_DESCR, timePeriod);
    }

    calculateResult(slope: number, intercept: number): number {
        return slope * (this.timePeriod - 1) + intercept;
    }
}
