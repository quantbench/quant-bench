import * as indicators from "../";

export class AverageDeviation
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "AVGDEV";
    static INDICATOR_DESCR: string = "Average Deviation";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private sum: number;
    private deviation: number;
    private periodHistory: indicators.Queue<number>;

    constructor(timePeriod: number = AverageDeviation.TIMEPERIOD_DEFAULT) {
        super(AverageDeviation.INDICATOR_NAME, AverageDeviation.INDICATOR_DESCR);

        if (timePeriod < AverageDeviation.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, AverageDeviation.TIMEPERIOD_MIN, timePeriod)));
        }

        this.sum = 0;
        this.deviation = 0;
        this.timePeriod = timePeriod;
        this.periodHistory = new indicators.Queue<number>();
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        this.periodHistory.enqueue(inputData);

        if (this.periodHistory.count >= this.timePeriod) {
            if (this.periodHistory.count > this.timePeriod) {
                this.periodHistory.dequeue();
            }
            this.sum = 0;
            this.periodHistory.toArray().forEach((value) => {
                this.sum += value;
            });
            this.deviation = 0;
            this.periodHistory.toArray().forEach((value) => {
                this.deviation += Math.abs(value - this.sum / this.timePeriod);
            });

            this.setCurrentValue(this.deviation / this.timePeriod);

            this.periodHistory.dequeue();
        }

        return this.isReady;
    }
}

export class AVGDEV extends AverageDeviation {

}
