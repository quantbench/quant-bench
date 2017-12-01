import * as indicators from "../";
import { Queue } from "../Queue";

export class WeightedMovingAverage
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "WMA";
    static INDICATOR_DESCR: string = "Weighted Moving Average";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private periodHistory: Queue<number>;
    private periodCounter: number;
    private periodWeightTotal: number;

    private iter: number;
    private sum: number;

    constructor(timePeriod: number = WeightedMovingAverage.TIMEPERIOD_DEFAULT) {
        super(WeightedMovingAverage.INDICATOR_NAME, WeightedMovingAverage.INDICATOR_DESCR);

        if (timePeriod < WeightedMovingAverage.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, WeightedMovingAverage.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodCounter = timePeriod * -1;
        this.periodHistory = new Queue<number>();

        this.iter = 0;
        this.sum = 0;

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
            this.iter = 1;
            this.sum = 0;

            this.periodHistory.toArray().forEach((item) => {
                let localSum = 0;
                for (let i = 1; i <= this.iter; i++) {
                    localSum += item;
                }
                this.sum += localSum;
                this.iter++;
            });

            this.setCurrentValue(this.sum / this.periodWeightTotal);
        }

        return this.isReady;
    }
}

export class WMA extends WeightedMovingAverage {

}
