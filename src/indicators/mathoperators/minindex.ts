import * as indicators from "../";

export class MININDEX
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MININDEX";
    static INDICATOR_DESCR: string = "Index of lowest value over a specified period";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;
    private periodHistory: indicators.Queue<number>;

    constructor(timePeriod: number = MININDEX.TIMEPERIOD_DEFAULT) {
        super(MININDEX.INDICATOR_NAME, MININDEX.INDICATOR_DESCR);

        if (timePeriod < MININDEX.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, MININDEX.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodHistory = new indicators.Queue<number>();

        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        this.periodHistory.enqueue(inputData);

        if (this.periodHistory.count > this.timePeriod) {
            this.periodHistory.dequeue();
        }

        if (this.periodHistory.count >= this.timePeriod) {
            this.setCurrentValue(indicators.getQueueMinIndex(this.periodHistory));
        }

        return this.isReady;
    }
}
