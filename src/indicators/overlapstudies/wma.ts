import * as indicators from "../";
import { AbstractIndicator } from "../abstractIndicator";
import { Queue } from "../queue";

export class WMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static WMA_INDICATOR_NAME: string = "WMA";
    static WMA_INDICATOR_DESCR: string = "Weighted Moving Average";
    static WMA_TIMEPERIOD_DEFAULT: number = 30;
    static WMA_TIMEPERIOD_MIN: number = 2;

    timePeriod: number;
    periodHistory: Queue<number>;
    periodCounter: number;
    periodWeightTotal: number;

    constructor(timePeriod: number) {
        super(WMA.WMA_INDICATOR_NAME, WMA.WMA_INDICATOR_DESCR);
        if (timePeriod === undefined) {
            this.timePeriod = WMA.WMA_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < WMA.WMA_TIMEPERIOD_MIN) {
                throw (new Error(indicators.generateMinTimePeriodError(this.name, WMA.WMA_TIMEPERIOD_MIN, timePeriod)));
            }
        }

        this.timePeriod = timePeriod;
        this.periodCounter = timePeriod * -1;
        this.periodHistory = new Queue<number>();

        let weightedTotal = 0;
        for (let i = 1; i <= timePeriod; i++) {
            weightedTotal += i;
        }
        this.periodWeightTotal = weightedTotal;
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {

        this.periodCounter += 1;
        this.periodHistory.enqueue(inputData);

        if (this.periodHistory.count > this.timePeriod) {
            this.periodHistory.dequeue();
        }

        if (this.periodCounter >= 0) {
            // calculate the ind
            let iter: number = 1;
            let sum = 0;

            this.periodHistory.toArray().forEach((item) => {
                let localSum = 0;
                for (let i = 1; i <= iter; i++) {
                    localSum += item;
                }
                sum += localSum;
                iter++;
            });

            this.setCurrentValue(sum / this.periodWeightTotal);
        }

        return this.isReady;
    }
}
