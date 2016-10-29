import * as indicators from "../";
import { AbstractIndicator } from "../abstractIndicator";

export class STDDEV
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static INDICATOR_NAME: string = "STDDEV";
    static INDICATOR_DESCR: string = "Standard Deviation";
    static TIMEPERIOD_DEFAULT: number = 5;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private variance: indicators.VAR;

    constructor(timePeriod: number = STDDEV.TIMEPERIOD_DEFAULT) {
        super(STDDEV.INDICATOR_NAME, STDDEV.INDICATOR_DESCR);

        if (timePeriod < STDDEV.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, STDDEV.TIMEPERIOD_MIN, timePeriod)));
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
