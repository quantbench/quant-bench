import * as indicators from "../";

export class Sum
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "Sum";
    static INDICATOR_DESCR: string = "Summation";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;
    private periodHistory: indicators.Queue<number>;
    private currentSum: number;

    constructor(timePeriod: number = Sum.TIMEPERIOD_DEFAULT) {
        super(Sum.INDICATOR_NAME, Sum.INDICATOR_DESCR);

        if (timePeriod < Sum.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, Sum.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.currentSum = 0;
        this.periodHistory = new indicators.Queue<number>();

        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        this.periodHistory.enqueue(inputData);
        this.currentSum += inputData;

        if (this.periodHistory.count > this.timePeriod) {
            this.currentSum -= this.periodHistory.dequeue();
        }

        if (this.periodHistory.count >= this.timePeriod) {
            this.setCurrentValue(this.currentSum);
        }

        return this.isReady;
    }
}
