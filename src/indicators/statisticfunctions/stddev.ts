import * as indicators from "../";
import { AbstractIndicator } from "../abstractIndicator";

export const STDDEV_INDICATOR_NAME: string = "STDDEV";
export const STDDEV_INDICATOR_DESCR: string = "Standard Deviation";
export const STDDEV_TIMEPERIOD_DEFAULT: number = 5;
export const STDDEV_TIMEPERIOD_MIN: number = 2;

export class STDDEV
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    timePeriod: number;
    variance: indicators.VAR;

    constructor(timePeriod: number) {
        super(STDDEV_INDICATOR_NAME, STDDEV_INDICATOR_DESCR);
        if (timePeriod === undefined) {
            this.timePeriod = STDDEV_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < STDDEV_TIMEPERIOD_MIN) {
                throw (new Error(indicators.generateMinTimePeriodError(this.name, STDDEV_TIMEPERIOD_MIN, timePeriod)));
            }
        }

        this.timePeriod = timePeriod;
        this.variance = new indicators.VAR(this.timePeriod);
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        if (this.variance.receiveData(inputData)) {
            let variance = this.variance.currentValue;
            let result: number = Math.sqrt(variance);
            this.setCurrentValue(result);
            this.setIsReady();
        }
        return this.isReady;
    }
}
