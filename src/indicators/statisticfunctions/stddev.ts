import * as indicators from "../";
import { AbstractIndicator } from "../abstractIndicator";

export class STDDEV
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static STDDEV_INDICATOR_NAME: string = "STDDEV";
    static STDDEV_INDICATOR_DESCR: string = "Standard Deviation";
    static STDDEV_TIMEPERIOD_DEFAULT: number = 5;
    static STDDEV_TIMEPERIOD_MIN: number = 2;

    timePeriod: number;
    variance: indicators.VAR;

    constructor(timePeriod: number) {
        super(STDDEV.STDDEV_INDICATOR_NAME, STDDEV.STDDEV_INDICATOR_DESCR);
        if (timePeriod === undefined) {
            this.timePeriod = STDDEV.STDDEV_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < STDDEV.STDDEV_TIMEPERIOD_MIN) {
                throw (new Error(indicators.generateMinTimePeriodError(this.name, STDDEV.STDDEV_TIMEPERIOD_MIN, timePeriod)));
            }
        }

        this.timePeriod = timePeriod;
        this.variance = new indicators.VAR(this.timePeriod);
        this.variance.on("data", (data: number) => this.receiveVarianceData(data));
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        this.variance.receiveData(inputData);
        return this.isReady;
    }

    receiveVarianceData(data: number) {
        let variance = this.variance.currentValue;
        let result: number = Math.sqrt(variance);
        this.setCurrentValue(result);
    }
}
