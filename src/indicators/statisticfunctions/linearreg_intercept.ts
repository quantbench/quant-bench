import { LINEARREGBASE } from "./linearreg_base";

export class LINEARREGINTERCEPT
    extends LINEARREGBASE {

    static INDICATOR_NAME: string = "LINEARREGINTERCEPT";
    static INDICATOR_DESCR: string = "Linear Regression Intercept";
    static TIMEPERIOD_DEFAULT: number = 14;

    constructor(timePeriod: number = LINEARREGINTERCEPT.TIMEPERIOD_DEFAULT) {
        super(LINEARREGINTERCEPT.INDICATOR_NAME, LINEARREGINTERCEPT.INDICATOR_DESCR, timePeriod);
    }

    calculateResult(slope: number, intercept: number): number {
        return intercept;
    }
}
