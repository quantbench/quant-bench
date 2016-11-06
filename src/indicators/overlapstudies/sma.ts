import * as indicators from "../";
import { Queue } from "../queue";

export class SMA
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "SMA";
    static INDICATOR_DESCR: string = "Simple Moving Average";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private periodHistory: Queue<number>;
    private periodTotal: number;

    constructor(timePeriod: number = SMA.TIMEPERIOD_DEFAULT) {
        super(SMA.INDICATOR_NAME, SMA.INDICATOR_DESCR);

        if (timePeriod < SMA.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, SMA.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodTotal = 0;
        this.setLookBack(this.timePeriod - 1);

        this.periodHistory = new Queue<number>();
    }

    receiveData(inputData: number): boolean {
        if (this.periodHistory.count < this.timePeriod) {
            this.periodHistory.enqueue(inputData);
            this.periodTotal += inputData;
        } else {
            let valueToRemove: number = this.periodHistory.peek();
            this.periodTotal = this.periodTotal - valueToRemove + inputData;
            this.periodHistory.dequeue();
            this.periodHistory.enqueue(inputData);
        }
        if (this.periodHistory.count >= this.timePeriod) {
            this.setCurrentValue(this.periodTotal / this.timePeriod);
        }
        return this.isReady;
    }
}
