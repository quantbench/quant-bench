import * as indicators from "../";

export class MAX
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MAX";
    static INDICATOR_DESCR: string = "Highest value over a specified period";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;
    private periodHistory: indicators.Queue<number>;
    private currentHigh: number;

    constructor(timePeriod: number = MAX.TIMEPERIOD_DEFAULT) {
        super(MAX.INDICATOR_NAME, MAX.INDICATOR_DESCR);

        if (timePeriod < MAX.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, MAX.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.currentHigh = Number.MIN_VALUE;
        this.periodHistory = new indicators.Queue<number>();

        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        this.periodHistory.enqueue(inputData);

        if (this.periodHistory.count > this.timePeriod) {
            this.periodHistory.dequeue();

            this.currentHigh = indicators.getQueueMax(this.periodHistory);

            this.setCurrentValue(this.currentHigh);
        } else {
            if (inputData > this.currentHigh) {
                this.currentHigh = inputData;
            }

            if (this.periodHistory.count === this.timePeriod) {
                this.setCurrentValue(this.currentHigh);
            }
        }
        return this.isReady;
    }
}
