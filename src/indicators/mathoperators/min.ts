import * as indicators from "../";

export class MIN
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MIN";
    static INDICATOR_DESCR: string = "Lowest value over a specified period";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;
    private periodHistory: indicators.Queue<number>;
    private currentLow: number;

    constructor(timePeriod: number = MIN.TIMEPERIOD_DEFAULT) {
        super(MIN.INDICATOR_NAME, MIN.INDICATOR_DESCR);

        if (timePeriod < MIN.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, MIN.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.currentLow = Number.MAX_VALUE;
        this.periodHistory = new indicators.Queue<number>();

        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        this.periodHistory.enqueue(inputData);

        if (this.periodHistory.count > this.timePeriod) {
            this.periodHistory.dequeue();

            this.currentLow = indicators.getQueueMin(this.periodHistory);

            this.setCurrentValue(this.currentLow);
        } else {
            if (inputData < this.currentLow) {
                this.currentLow = inputData;
            }

            if (this.periodHistory.count === this.timePeriod) {
                this.setCurrentValue(this.currentLow);
            }
        }
        return this.isReady;
    }
}
