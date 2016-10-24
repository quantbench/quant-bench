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
    periodCounter: number;
    mean: number;
    variance: number;
    periodHistory: Queue<number>;

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
        this.periodCounter = 0;
        this.mean = 0;
        this.variance = 0;
        this.periodHistory = new Queue<number>();
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        this.periodHistory.enqueue(inputData);

        let delta: number = 0;
        if (this.periodCounter < this.timePeriod) {
            this.periodCounter += 1;
            delta = inputData - this.mean;
            this.mean = this.mean + delta / this.periodCounter;

            this.variance = this.variance + delta * (inputData - this.mean);
        } else {
            let dOld: number = 0;
            let dNew: number = 0;
            let firstValue: number = this.periodHistory.peek();
            delta = inputData - firstValue;
            dOld = firstValue - this.mean;
            this.mean = this.mean + delta / this.periodCounter;
            dNew = inputData - this.mean;
            this.variance = this.variance + (dOld + dNew) * delta;
        }

        if (this.periodHistory.count > this.timePeriod) {
            this.periodHistory.dequeue();
        }

        if (this.periodCounter >= this.timePeriod) {
            let result = this.variance / this.timePeriod;
            if (result < 0) {
                //
                console.log("error");
            }
            this.setCurrentValue(result);
            this.setIsReady();
        }

        return this.isReady;
    }
}
