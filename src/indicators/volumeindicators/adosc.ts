import * as indicators from "../";
import * as marketData from "../../data/market/";

export class ADOSC
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "ADOSC";
    static INDICATOR_DESCR: string = "Chaikin A/D Oscillator";
    static SLOW_TIMEPERIOD_DEFAULT: number = 10;
    static SLOW_TIMEPERIOD_MIN: number = 2;
    static FAST_TIMEPERIOD_DEFAULT: number = 3;
    static FAST_TIMEPERIOD_MIN: number = 2;

    public slowTimePeriod: number;
    public fastTimePeriod: number;

    private ad: indicators.AD;
    private slowEMA: number;
    private fastEMA: number;
    private fastK: number;
    private oneMinusFastK: number;
    private slowK: number;
    private oneMinusSlowK: number;
    private periodCounter: number;

    constructor(slowTimePeriod: number = ADOSC.SLOW_TIMEPERIOD_DEFAULT, fastTimePeriod: number = ADOSC.FAST_TIMEPERIOD_DEFAULT) {
        super(ADOSC.INDICATOR_NAME, ADOSC.INDICATOR_DESCR);

        if (slowTimePeriod < ADOSC.SLOW_TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, ADOSC.SLOW_TIMEPERIOD_MIN, slowTimePeriod)));
        }

        if (fastTimePeriod < ADOSC.FAST_TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, ADOSC.FAST_TIMEPERIOD_MIN, fastTimePeriod)));
        }

        this.slowTimePeriod = slowTimePeriod;
        this.fastTimePeriod = fastTimePeriod;
        this.periodCounter = 0;

        this.ad = new indicators.AD();
        // this.ad.on("data", (data: number) => this.receiveADData(data));
        this.slowEMA = 0; // new indicators.EMA(this.slowTimePeriod);
        // this.slowEMA.on("data", (data: number) => this.receiveSlowEMAData(data));
        this.fastEMA = 0; // new indicators.EMA(this.fastTimePeriod);
        this.fastK = this.periodToK(this.fastTimePeriod);
        this.oneMinusFastK = 1.0 - this.fastK;
        this.slowK = this.periodToK(this.slowTimePeriod);
        this.oneMinusSlowK = 1.0 - this.slowK;
        this.periodCounter = -1;

        let slowestPeriod: number = 0;
        if (fastTimePeriod < slowTimePeriod) {
            slowestPeriod = slowTimePeriod;
        } else {
            slowestPeriod = fastTimePeriod;
        }
        this.setLookBack(slowestPeriod - 1);
    }

    receiveData(inputData: marketData.PriceVolumeBar): boolean {
        this.periodCounter++;
        this.ad.receiveData(inputData);

        if (this.periodCounter === 0) {
            this.fastEMA = this.ad.currentValue;
            this.slowEMA = this.ad.currentValue;
        } else if (this.periodCounter < this.lookback) {
            this.fastEMA = (this.fastK * this.ad.currentValue) + (this.oneMinusFastK * this.fastEMA);
            this.slowEMA = (this.slowK * this.ad.currentValue) + (this.oneMinusSlowK * this.slowEMA);
        } else {
            this.fastEMA = (this.fastK * this.ad.currentValue) + (this.oneMinusFastK * this.fastEMA);
            this.slowEMA = (this.slowK * this.ad.currentValue) + (this.oneMinusSlowK * this.slowEMA);
            this.setCurrentValue(this.fastEMA - this.slowEMA);
        }

        return this.isReady;
    }

    private periodToK(period: number): number {
        return 2 / (period + 1);
    }
}
