import * as indicators from "../";

export class MAXINDEX
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MAXINDEX";
    static INDICATOR_DESCR: string = "Index of highest value over a specified period";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;
    private periodHistory: indicators.Queue<number>;

    constructor(timePeriod: number = MAXINDEX.TIMEPERIOD_DEFAULT) {
        super(MAXINDEX.INDICATOR_NAME, MAXINDEX.INDICATOR_DESCR);

        if (timePeriod < MAXINDEX.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, MAXINDEX.TIMEPERIOD_MIN, timePeriod)));
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
            this.setCurrentValue(indicators.getQueueMaxIndex(this.periodHistory));
        }

        return this.isReady;
    }
}
