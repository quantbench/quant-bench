import * as indicators from "../";

export class T3MovingAverage
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "T3";
    static INDICATOR_DESCR: string = "Triple Exponential Moving Average (T3)";
    static TIMEPERIOD_DEFAULT: number = 5;
    static TIMEPERIOD_MIN: number = 2;
    static VOLUMEFACTOR_DEFAULT: number = 0.7;
    static VOLUMEFACTOR_MIN: number = 0;
    static VOLUMEFACTOR_MAX: number = 1;

    public timePeriod: number;
    private k: number;
    private oneMinusK: number;
    private e1: number;
    private e2: number;
    private e3: number;
    private e4: number;
    private e5: number;
    private e6: number;
    private c1: number;
    private c2: number;
    private c3: number;
    private c4: number;
    private periodHistory: indicators.Queue<number>;
    private periodCounter: number;

    private historyData: number[];
    private historyIter: number;
    private temp: number;

    constructor(timePeriod: number = T3MovingAverage.TIMEPERIOD_DEFAULT, volumeFactor: number =
        T3MovingAverage.VOLUMEFACTOR_DEFAULT) {
        super(T3MovingAverage.INDICATOR_NAME, T3MovingAverage.INDICATOR_DESCR);

        if (timePeriod < T3MovingAverage.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, T3MovingAverage.TIMEPERIOD_MIN, timePeriod)));
        }

        if (volumeFactor < T3MovingAverage.VOLUMEFACTOR_MIN) {
            throw (new Error(indicators.generateMinVolumeFactorError(this.name,
                T3MovingAverage.VOLUMEFACTOR_MIN, timePeriod)));
        }

        if (volumeFactor > T3MovingAverage.VOLUMEFACTOR_MAX) {
            throw (new Error(indicators.generateMaxVolumeFactorError(this.name,
                T3MovingAverage.VOLUMEFACTOR_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.k = 2.0 / (this.timePeriod + 1);
        this.oneMinusK = 1.0 - this.k;
        this.periodCounter = 0;
        this.periodHistory = new indicators.Queue<number>();
        this.e1 = 0;
        this.e2 = 0;
        this.e3 = 0;
        this.e4 = 0;
        this.e5 = 0;
        this.e6 = 0;
        this.historyIter = 0;
        this.temp = 0;

        const tempVal: number = volumeFactor * volumeFactor;
        this.c1 = -(tempVal * volumeFactor);
        this.c2 = 3.0 * (tempVal - this.c1);
        this.c3 = -6.0 * tempVal - 3.0 * (volumeFactor - this.c1);
        this.c4 = 1.0 + 3.0 * volumeFactor - this.c1 + 3.0 * tempVal;

        this.setLookBack(6 * (this.timePeriod - 1));
    }

    receiveData(inputData: number): boolean {
        this.periodCounter++;

        if (this.periodCounter === this.lookback + 1) {
            this.periodHistory.enqueue(inputData);
            this.temp = 0;

            this.historyData = this.periodHistory.toArray();
            this.historyIter = 0;

            // init e1
            this.temp = this.historyData[this.historyIter++];
            for (let i = this.timePeriod - 1; i > 0; i--) {
                this.temp += this.historyData[this.historyIter++];
            }
            this.e1 = this.temp / this.timePeriod;

            // init e2
            this.temp = this.e1;
            for (let i = this.timePeriod - 1; i > 0; i--) {
                this.e1 = (this.k * this.historyData[this.historyIter++]) + (this.oneMinusK * this.e1);
                this.temp += this.e1;
            }
            this.e2 = this.temp / this.timePeriod;

            // init e3
            this.temp = this.e2;
            for (let i = this.timePeriod - 1; i > 0; i--) {
                this.e1 = (this.k * this.historyData[this.historyIter++]) + (this.oneMinusK * this.e1);
                this.e2 = (this.k * this.e1) + (this.oneMinusK * this.e2);
                this.temp += this.e2;
            }

            this.e3 = this.temp / this.timePeriod;

            // init e4
            this.temp = this.e3;
            for (let i = this.timePeriod - 1; i > 0; i--) {
                this.e1 = (this.k * this.historyData[this.historyIter++]) + (this.oneMinusK * this.e1);
                this.e2 = (this.k * this.e1) + (this.oneMinusK * this.e2);
                this.e3 = (this.k * this.e2) + (this.oneMinusK * this.e3);
                this.temp += this.e3;
            }

            this.e4 = this.temp / this.timePeriod;

            // init e5
            this.temp = this.e4;
            for (let i = this.timePeriod - 1; i > 0; i--) {
                this.e1 = (this.k * this.historyData[this.historyIter++]) + (this.oneMinusK * this.e1);
                this.e2 = (this.k * this.e1) + (this.oneMinusK * this.e2);
                this.e3 = (this.k * this.e2) + (this.oneMinusK * this.e3);
                this.e4 = (this.k * this.e3) + (this.oneMinusK * this.e4);
                this.temp += this.e4;
            }
            this.e5 = this.temp / this.timePeriod;

            // init e6
            this.temp = this.e5;
            for (let i = this.timePeriod - 1; i > 0; i--) {
                this.e1 = (this.k * this.historyData[this.historyIter++]) + (this.oneMinusK * this.e1);
                this.e2 = (this.k * this.e1) + (this.oneMinusK * this.e2);
                this.e3 = (this.k * this.e2) + (this.oneMinusK * this.e3);
                this.e4 = (this.k * this.e3) + (this.oneMinusK * this.e4);
                this.e5 = (this.k * this.e4) + (this.oneMinusK * this.e5);
                this.temp += this.e5;
            }
            this.e6 = this.temp / this.timePeriod;

            while (this.historyIter < this.lookback - 1) {
                this.e1 = (this.k * this.historyData[this.historyIter++]) + (this.oneMinusK * this.e1);
                this.e2 = (this.k * this.e1) + (this.oneMinusK * this.e2);
                this.e3 = (this.k * this.e2) + (this.oneMinusK * this.e3);
                this.e4 = (this.k * this.e3) + (this.oneMinusK * this.e4);
                this.e5 = (this.k * this.e4) + (this.oneMinusK * this.e5);
                this.e6 = (this.k * this.e5) + (this.oneMinusK * this.e6);

            }
            this.setCurrentValue(this.c1 * this.e6 + this.c2 * this.e5 + this.c3 * this.e4 + this.c4 * this.e3);

        } else if (this.periodCounter <= this.lookback) {
            this.periodHistory.enqueue(inputData);
        } else {
            this.e1 = (this.k * inputData) + (this.oneMinusK * this.e1);
            this.e2 = (this.k * this.e1) + (this.oneMinusK * this.e2);
            this.e3 = (this.k * this.e2) + (this.oneMinusK * this.e3);
            this.e4 = (this.k * this.e3) + (this.oneMinusK * this.e4);
            this.e5 = (this.k * this.e4) + (this.oneMinusK * this.e5);
            this.e6 = (this.k * this.e5) + (this.oneMinusK * this.e6);

            this.setCurrentValue(this.c1 * this.e6 + this.c2 * this.e5 + this.c3 * this.e4 + this.c4 * this.e3);
        }

        return this.isReady;
    }
}

export class T3 extends T3MovingAverage {

}
