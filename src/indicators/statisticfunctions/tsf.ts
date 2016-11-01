import * as indicators from "../";

export class TSF
    extends indicators.AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static INDICATOR_NAME: string = "TSF";
    static INDICATOR_DESCR: string = "Time Series Forecast";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    constructor(timePeriod: number = TSF.TIMEPERIOD_DEFAULT) {
        super(TSF.INDICATOR_NAME, TSF.INDICATOR_DESCR);

        if (timePeriod < TSF.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, TSF.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        // this.rollingSum = 0;
        // this.rollingSumOfSquares = 0;
        // this.periodCounter = 0;
        // this.periodHistory = new Queue<number>();
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
