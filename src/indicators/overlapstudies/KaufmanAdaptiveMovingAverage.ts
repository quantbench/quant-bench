import * as indicators from "../";

export class KaufmanAdaptiveMovingAverage
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "KAMA";
    static INDICATOR_DESCR: string = "Kaufman Adaptive Moving Average";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;
    private periodHistory: indicators.Queue<number>;
    private periodCounter: number;
    private constantMax: number;
    private constantDiff: number;
    private sumROC: number;
    private periodROC: number;
    private previousClose: number;
    private previousKama: number;

    constructor(timePeriod: number = KaufmanAdaptiveMovingAverage.TIMEPERIOD_DEFAULT) {
        super(KaufmanAdaptiveMovingAverage.INDICATOR_NAME, KaufmanAdaptiveMovingAverage.INDICATOR_DESCR);

        if (timePeriod < KaufmanAdaptiveMovingAverage.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, KaufmanAdaptiveMovingAverage.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodCounter = (timePeriod + 1) * -1;
        this.periodHistory = new indicators.Queue<number>();

        this.constantMax = 2.0 / (30.0 + 1.0);
        this.constantDiff = (2.0 / 3.0) - (2.0 / 31);

        this.sumROC = 0;
        this.periodROC = 0;
        this.previousClose = 0;
        this.previousKama = 0;

        this.setLookBack(this.timePeriod);
    }

    receiveData(inputData: number): boolean {
        this.periodCounter += 1;
        this.periodHistory.enqueue(inputData);

        if (this.periodCounter <= 0) {
            if (this.previousClose > 0) {
                this.sumROC += Math.abs(inputData - this.previousClose);
            }
        }

        if (this.periodCounter === 0) {
            let er = 0;
            let sc = 0;
            let closeMinusN = this.periodHistory.peek();
            this.previousKama = this.previousClose;
            this.periodROC = inputData - closeMinusN;

            // calculate the efficiency ratio
            if (this.sumROC <= this.periodROC || this.isZero(this.sumROC)) {
                er = 1;
            } else {
                er = Math.abs(this.periodROC / this.sumROC);
            }

            sc = (er * this.constantDiff) + this.constantMax;
            sc *= sc;
            this.previousKama = ((inputData - this.previousKama) * sc) + this.previousKama;

            let result = this.previousKama;

            this.setCurrentValue(result);
        } else if (this.periodCounter > 0) {
            let er = 0;
            let sc = 0;
            let closeMinusN = this.periodHistory.peek();
            let closeMinusN1 = this.periodHistory.toArray()[1];

            this.periodROC = inputData - closeMinusN1;

            this.sumROC -= Math.abs(closeMinusN1 - closeMinusN);
            this.sumROC += Math.abs(inputData - this.previousClose);

            // calculate the efficiency ratio
            if (this.sumROC <= this.periodROC || this.isZero(this.sumROC)) {
                er = 1;
            } else {
                er = Math.abs(this.periodROC / this.sumROC);
            }

            sc = (er * this.constantDiff) + this.constantMax;
            sc *= sc;
            this.previousKama = ((inputData - this.previousKama) * sc) + this.previousKama;

            let result = this.previousKama;

            this.setCurrentValue(result);
        }

        this.previousClose = inputData;

        if (this.periodHistory.count > (this.timePeriod + 1)) {
            this.periodHistory.dequeue();
        }
        return this.isReady;
    }

    private isZero(value: number): boolean {
        let epsilon = 0.00000000000001;
        return (((-epsilon) < value) && (value < epsilon));
    }
}

export class KAMA extends KaufmanAdaptiveMovingAverage {

}
