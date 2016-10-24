import * as indicators from "../";
import { AbstractIndicator } from "../abstractIndicator";
import { Queue } from "../queue";

export const VAR_INDICATOR_NAME: string = "VAR";
export const VAR_INDICATOR_DESCR: string = "Variance";
export const VAR_TIMEPERIOD_DEFAULT: number = 5;
export const VAR_TIMEPERIOD_MIN: number = 2;

export class VAR
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    timePeriod: number;
    periodHistory: Queue<number>;
    periodCounter: number;
    rollingSum: number;
    rollingSumOfSquares: number;

    constructor(timePeriod: number) {
        super(VAR_INDICATOR_NAME, VAR_INDICATOR_DESCR);
        if (timePeriod === undefined) {
            this.timePeriod = VAR_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < VAR_TIMEPERIOD_MIN) {
                throw (new Error(indicators.generateMinTimePeriodError(this.name, VAR_TIMEPERIOD_MIN, timePeriod)));
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
