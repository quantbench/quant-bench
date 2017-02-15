import * as indicators from "../";
import * as marketData from "../../data/market/";
import { MA_TYPE } from "../MovingAverageType";

export class Stochastic
    extends indicators.AbstractIndicatorBase<marketData.PriceBar> {

    static INDICATOR_NAME: string = "STOCH";
    static INDICATOR_DESCR: string = "Stochastic";
    static FASTKPERIOD_DEFAULT: number = 5;
    static FASTKPERIOD_MIN: number = 1;
    static SLOWKPERIOD_DEFAULT: number = 3;
    static SLOWKPERIOD_MIN: number = 1;
    static SLOWKMATYPE_DEFAULT: indicators.MA_TYPE = indicators.MA_TYPE.SMA;
    static SLOWDPERIOD_DEFAULT: number = 3;
    static SLOWDPERIOD_MIN: number = 1;
    static SLOWDMATYPE_DEFAULT: indicators.MA_TYPE = indicators.MA_TYPE.SMA;

    public fastKTimePeriod: number;
    public slowKTimePeriod: number;
    public slowKMAType: indicators.MA_TYPE;
    public slowDTimePeriod: number;
    public slowDMAType: indicators.MA_TYPE;

    private slowKMA: indicators.MovingAverage;
    private slowDMA: indicators.MovingAverage;

    private maxValue: indicators.Max;
    private minValue: indicators.Min;

    private periodCounter: number;
    private currentPeriodHigh: number;
    private currentPeriodLow: number;
    private currentFastK: number;
    private currentSlowKMA: number;
    private currentSlowDMA: number;

    private slowDInternal: number;
    private slowKInternal: number;

    constructor(fastKTimePeriod: number = Stochastic.FASTKPERIOD_DEFAULT,
        slowKTimePeriod: number = Stochastic.SLOWKPERIOD_DEFAULT,
        slowKMAType: indicators.MA_TYPE = Stochastic.SLOWKMATYPE_DEFAULT,
        slowDTimePeriod: number = Stochastic.SLOWDPERIOD_DEFAULT,
        slowDMAType: indicators.MA_TYPE = Stochastic.SLOWDMATYPE_DEFAULT) {
        super(Stochastic.INDICATOR_NAME, Stochastic.INDICATOR_DESCR);

        if (fastKTimePeriod < Stochastic.FASTKPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, Stochastic.FASTKPERIOD_MIN, fastKTimePeriod)));
        }

        if (slowKTimePeriod < Stochastic.SLOWKPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, Stochastic.SLOWKPERIOD_MIN, slowKTimePeriod)));
        }

        if (slowDTimePeriod < Stochastic.SLOWDPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, Stochastic.SLOWDPERIOD_MIN, slowDTimePeriod)));
        }

        this.fastKTimePeriod = fastKTimePeriod;
        this.slowKTimePeriod = slowKTimePeriod;
        this.slowDTimePeriod = slowDTimePeriod;
        this.periodCounter = this.fastKTimePeriod * -1;
        this.slowKMAType = slowKMAType;
        this.slowKMA = new indicators.MovingAverage(this.slowKTimePeriod, slowKMAType);
        this.slowKMA.on("data", (data: number) => this.receiveSlowKMAData(data));
        this.slowDMAType = slowDMAType;
        this.slowDMA = new indicators.MovingAverage(this.slowDTimePeriod, slowDMAType);
        this.slowDMA.on("data", (data: number) => this.receiveSlowDMAData(data));
        this.maxValue = new indicators.Max(this.fastKTimePeriod);
        this.maxValue.on("data", (data: number) => this.receiveMaxValueData(data));
        this.minValue = new indicators.Min(this.fastKTimePeriod);
        this.minValue.on("data", (data: number) => this.receiveMinValueData(data));

        this.currentPeriodHigh = 0;
        this.currentPeriodLow = 0;
        this.currentFastK = 0;
        this.currentSlowKMA = 0;
        this.currentSlowDMA = 0;
        this.slowDInternal = 0;
        this.slowKInternal = 0;

        this.setLookBack(this.fastKTimePeriod - 1 + this.slowDMA.lookback + this.slowKMA.lookback);
    }

    public get slowK(): number {
        return this.slowKInternal;
    }

    public get slowD(): number {
        return this.slowDInternal;
    }

    protected setCurrentValue(slowK: number, slowD: number) {
        this.slowKInternal = slowK;
        this.slowDInternal = slowD;
        this.emit("data", this.slowK, this.slowD);
        this.setIsReady();
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.periodCounter += 1;
        this.maxValue.receiveData(inputData.high);
        this.minValue.receiveData(inputData.low);

        if (this.periodCounter >= 0) {
            this.currentFastK = 100 * ((inputData.close - this.currentPeriodLow) / (this.currentPeriodHigh - this.currentPeriodLow));
            this.slowKMA.receiveData(this.currentFastK);
        }
        return this.isReady;
    }

    private receiveSlowKMAData(data: number) {
        this.currentSlowKMA = data;
        this.slowDMA.receiveData(data);
    }

    private receiveSlowDMAData(data: number) {
        this.currentSlowDMA = data;
        this.setCurrentValue(this.currentSlowKMA, this.currentSlowDMA);
    }

    private receiveMaxValueData(data: number) {
        this.currentPeriodHigh = data;
    }

    private receiveMinValueData(data: number) {
        this.currentPeriodLow = data;
    }
}

export class STOCH extends Stochastic {

}
