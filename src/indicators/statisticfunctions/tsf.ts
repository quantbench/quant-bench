import { LINEARREGBASE } from "./linearreg_base";

export class TSF
    extends LINEARREGBASE {

    static INDICATOR_NAME: string = "TSF";
    static INDICATOR_DESCR: string = "Time Series Forecast";
    static TIMEPERIOD_DEFAULT: number = 14;

    constructor(timePeriod: number = TSF.TIMEPERIOD_DEFAULT) {
        super(TSF.INDICATOR_NAME, TSF.INDICATOR_DESCR, timePeriod);
    }

    calculateResult(slope: number, intercept: number): number {
        return intercept + slope * this.timePeriod;
    }
}
