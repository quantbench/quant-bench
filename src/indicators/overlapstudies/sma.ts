import { AbstractIndicator } from "../abstractIndicator";
import * as globals from "../globals";
import { IIndicator } from "../indicator";
import { Queue } from "../queue";

export const SMA_INDICATOR_NAME: string = "SMA";
export const SMA_TIMEPERIOD_DEFAULT: number = 30;
export const SMA_TIMEPERIOD_MIN: number = 2;

export class SMA
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    timePeriod: number;
    periodHistory: Queue<number>;
    periodTotal: number;
    constructor(timePeriod?: number) {
        super(SMA_INDICATOR_NAME);
        if (timePeriod === undefined) {
            this.timePeriod = SMA_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < SMA_TIMEPERIOD_MIN) {
                throw (new Error(globals.generateMinTimePeriodError(this.name, SMA_TIMEPERIOD_MIN, timePeriod)));
            }
            this.timePeriod = timePeriod;
        }

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
            this.currentValueInternal = this.periodTotal / this.timePeriod;
            this.isReadyInternal = true;
        }
        return this.isReady;
    }
}
