import * as indicators from "../";
import { Queue } from "../queue";

export class VAR
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

    constructor(timePeriod: number = VAR.TIMEPERIOD_DEFAULT) {
        super(VAR.INDICATOR_NAME, VAR.INDICATOR_DESCR);

        if (timePeriod < VAR.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, VAR.TIMEPERIOD_MIN, timePeriod)));
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
