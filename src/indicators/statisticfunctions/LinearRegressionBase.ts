import * as indicators from "../";

export abstract class LinearRegressionBase
    extends indicators.AbstractIndicator<number> {

    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private periodCounter: number;
    private periodHistory: indicators.Queue<number>;
    private sumX: number;
    private sumXSquare: number;
    private divisor: number;

    private sumXY: number;
    private sumY: number;
    private i: number;
    private history: number[];
    private m: number;
    private b: number;
    private e: number;

    constructor(name: string, description: string, timePeriod: number) {
        super(name, description);

        if (timePeriod < LinearRegressionBase.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(name, LinearRegressionBase.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodCounter = timePeriod * -1;
        this.periodHistory = new indicators.Queue<number>();

        const timePeriodFMinusOne = this.timePeriod - 1;
        this.sumX = this.timePeriod * timePeriodFMinusOne * 0.5;
        this.sumXSquare = this.timePeriod * timePeriodFMinusOne * (2 * this.timePeriod - 1) / 6;
        this.divisor = this.sumX * this.sumX - this.timePeriod * this.sumXSquare;
        this.sumXY = 0;
        this.sumY = 0;
        this.i = 0;
        this.m = 0;
        this.b = 0;
        this.e = 0;
        this.history = [];

        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        this.periodCounter += 1;

        if (this.periodCounter >= 0) {
            this.sumXY = 0;
            this.sumY = 0;
            this.i = this.timePeriod;

            this.history = this.periodHistory.toArray();
            for (let y = 0; y < this.history.length; y++) {
                this.e = this.history[y];
                if (this.e === 0) {
                    break;
                }

                this.i--;
                this.sumY += this.e;
                this.sumXY += this.i * this.e;
            }

            this.sumY += inputData;
            this.m = (this.timePeriod * this.sumXY - this.sumX * this.sumY) / this.divisor;
            this.b = (this.sumY - this.m * this.sumX) / this.timePeriod;
            this.setCurrentValue(this.calculateResult(this.m, this.b));
        }

        this.periodHistory.enqueue(inputData);
        if (this.periodHistory.count >= this.timePeriod) {
            this.periodHistory.dequeue();
        }
        return this.isReady;
    }

    public abstract calculateResult(slope: number, intercept: number): number;
}

export abstract class LINEARREGBASE extends LinearRegressionBase {

}
