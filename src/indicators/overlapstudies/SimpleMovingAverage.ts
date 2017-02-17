import * as indicators from "../";
import { Queue } from "../Queue";

export class SimpleMovingAverage
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "SMA";
    static INDICATOR_DESCR: string = "Simple Moving Average";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private periodHistory: Queue<number>;
    private periodTotal: number;

    constructor(timePeriod: number = SimpleMovingAverage.TIMEPERIOD_DEFAULT) {
        super(SimpleMovingAverage.INDICATOR_NAME, SimpleMovingAverage.INDICATOR_DESCR);

        if (timePeriod < SimpleMovingAverage.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, SimpleMovingAverage.TIMEPERIOD_MIN, timePeriod)));
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
            this.periodTotal = this.periodTotal - this.periodHistory.peek() + inputData;
            this.periodHistory.dequeue();
            this.periodHistory.enqueue(inputData);
        }
        if (this.periodHistory.count >= this.timePeriod) {
            this.setCurrentValue(this.periodTotal / this.timePeriod);
        }
        return this.isReady;
    }
}

export class SMA extends SimpleMovingAverage {

}
