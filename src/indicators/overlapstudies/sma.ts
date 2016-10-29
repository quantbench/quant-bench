import * as indicators from "../";
import { AbstractIndicator } from "../abstractIndicator";
import { Queue } from "../queue";

export class SMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static SMA_INDICATOR_NAME: string = "SMA";
    static SMA_INDICATOR_DESCR: string = "Simple Moving Average";
    static SMA_TIMEPERIOD_DEFAULT: number = 30;
    static SMA_TIMEPERIOD_MIN: number = 2;

    timePeriod: number;
    periodHistory: Queue<number>;
    periodTotal: number;
    constructor(timePeriod?: number) {
        super(SMA.SMA_INDICATOR_NAME, SMA.SMA_INDICATOR_DESCR);
        if (timePeriod === undefined) {
            this.timePeriod = SMA.SMA_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < SMA.SMA_TIMEPERIOD_MIN) {
                throw (new Error(indicators.generateMinTimePeriodError(this.name, SMA.SMA_TIMEPERIOD_MIN, timePeriod)));
            }
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
