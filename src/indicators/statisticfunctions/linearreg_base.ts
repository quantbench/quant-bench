import * as indicators from "../";

export abstract class LINEARREGBASE
    extends indicators.AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private periodCounter: number;
    private periodHistory: indicators.Queue<number>;
    private sumX: number;
    private sumXSquare: number;
    private divisor: number;

    constructor(name: string, description: string, timePeriod: number) {
        super(name, description);

        if (timePeriod < LINEARREGBASE.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(name, LINEARREGBASE.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodCounter = timePeriod * -1;
        this.periodHistory = new indicators.Queue<number>();

        let timePeriodFMinusOne = this.timePeriod - 1;
        this.sumX = this.timePeriod * timePeriodFMinusOne * 0.5;
        this.sumXSquare = this.timePeriod * timePeriodFMinusOne * (2 * this.timePeriod - 1) / 6;
        this.divisor = this.sumX * this.sumX - this.timePeriod * this.sumXSquare;

        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        this.periodCounter += 1;

        if (this.periodCounter >= 0) {
            let sumXY = 0;
            let sumY = 0;
            let i = this.timePeriod;

            let history = this.periodHistory.toArray();
            for (let y = 0; y < history.length; y++) {
                let e = history[y];
                if (e === 0) {
                    break;
                }

                i--;
                sumY += e;
                sumXY += i * e;
            }

            sumY += inputData;
            let m = (this.timePeriod * sumXY - this.sumX * sumY) / this.divisor;
            let b = (sumY - m * this.sumX) / this.timePeriod;
            let result = this.calculateResult(m, b);

            this.setCurrentValue(result);
        }

        this.periodHistory.enqueue(inputData);
        if (this.periodHistory.count >= this.timePeriod) {
            this.periodHistory.dequeue();
        }
        return this.isReady;
    }

    public abstract calculateResult(slope: number, intercept: number): number;
}
