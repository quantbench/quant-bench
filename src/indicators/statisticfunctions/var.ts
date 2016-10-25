import * as indicators from "../";
import { AbstractIndicator } from "../abstractIndicator";
import { Queue } from "../queue";

export class VAR
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static VAR_INDICATOR_NAME: string = "VAR";
    static VAR_INDICATOR_DESCR: string = "Variance";
    static VAR_TIMEPERIOD_DEFAULT: number = 5;
    static VAR_TIMEPERIOD_MIN: number = 2;

    timePeriod: number;
    periodHistory: Queue<number>;
    periodCounter: number;
    rollingSum: number;
    rollingSumOfSquares: number;

    constructor(timePeriod: number) {
        super(VAR.VAR_INDICATOR_NAME, VAR.VAR_INDICATOR_DESCR);
        if (timePeriod === undefined) {
            this.timePeriod = VAR.VAR_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < VAR.VAR_TIMEPERIOD_MIN) {
                throw (new Error(indicators.generateMinTimePeriodError(this.name, VAR.VAR_TIMEPERIOD_MIN, timePeriod)));
            }
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
