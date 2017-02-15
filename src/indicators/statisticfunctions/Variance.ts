import * as indicators from "../";
import { Queue } from "../Queue";

export class Variance
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "VAR";
    static INDICATOR_DESCR: string = "Variance";
    static TIMEPERIOD_DEFAULT: number = 5;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private periodHistory: Queue<number>;
    private periodCounter: number;
    private rollingSum: number;
    private rollingSumOfSquares: number;

    constructor(timePeriod: number = Variance.TIMEPERIOD_DEFAULT) {
        super(Variance.INDICATOR_NAME, Variance.INDICATOR_DESCR);

        if (timePeriod < Variance.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, Variance.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.rollingSum = 0;
        this.rollingSumOfSquares = 0;
        this.periodCounter = 0;
        this.periodHistory = new Queue<number>();
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        this.periodHistory.enqueue(inputData);

        if (this.periodCounter < this.timePeriod) {
            this.periodCounter += 1;
        }

        this.rollingSum += inputData;
        this.rollingSumOfSquares += inputData * inputData;

        if (this.periodCounter === this.timePeriod) {

            let mean1 = this.rollingSum / this.timePeriod;
            let mean2 = this.rollingSumOfSquares / this.timePeriod;
            let removed = this.periodHistory.dequeue();
            this.rollingSum -= removed;
            this.rollingSumOfSquares -= removed * removed;

            this.setCurrentValue(mean2 - mean1 * mean1);
            this.setIsReady();
        }

        return this.isReady;
    }
}

export class VAR extends Variance {

}
