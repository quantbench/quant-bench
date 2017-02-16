import * as indicators from "../";

export class StochasticRSI
    extends indicators.AbstractIndicatorBase<number> {

    static INDICATOR_NAME: string = "STOCHRSI";
    static INDICATOR_DESCR: string = "Stochastic Relative Strength Index";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 1;
    static FASTKPERIOD_DEFAULT: number = 5;
    static FASTKPERIOD_MIN: number = 1;
    static FASTDPERIOD_DEFAULT: number = 3;
    static FASTDPERIOD_MIN: number = 1;
    static FASTDMATYPE_DEFAULT: indicators.MA_TYPE = indicators.MA_TYPE.SMA;

    public timePeriod: number;
    public fastKTimePeriod: number;
    public fastDTimePeriod: number;
    public fastDMAType: indicators.MA_TYPE;

    private periodCounter: number;
    private fastDMA: indicators.MovingAverage;
    private rsi: indicators.RSI;
    private maxValue: indicators.Max;
    private minValue: indicators.Min;
    private currentPeriodHigh: number;
    private currentPeriodLow: number;
    private currentRSI: number;
    private currentFastK: number;
    private currentFastDMA: number;

    private fastDInternal: number;
    private fastKInternal: number;

    constructor(timePeriod: number = StochasticRSI.TIMEPERIOD_DEFAULT,
        fastKTimePeriod: number = StochasticRSI.FASTKPERIOD_DEFAULT,
        fastDTimePeriod: number = StochasticRSI.FASTDPERIOD_DEFAULT,
        fastDMAType: indicators.MA_TYPE = StochasticRSI.FASTDMATYPE_DEFAULT) {
        super(StochasticRSI.INDICATOR_NAME, StochasticRSI.INDICATOR_DESCR);

        if (timePeriod < StochasticRSI.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, StochasticRSI.TIMEPERIOD_MIN, timePeriod)));
        }

        if (fastKTimePeriod < StochasticRSI.FASTKPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, StochasticRSI.FASTKPERIOD_MIN, fastKTimePeriod)));
        }

        if (fastDTimePeriod < StochasticRSI.FASTDPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, StochasticRSI.FASTDPERIOD_MIN, fastDTimePeriod)));
        }

        this.timePeriod = timePeriod;
        this.fastKTimePeriod = fastKTimePeriod;
        this.fastDTimePeriod = fastDTimePeriod;
        this.fastDMAType = fastDMAType;

        this.periodCounter = this.fastKTimePeriod * -1;
        this.maxValue = new indicators.Max(this.fastKTimePeriod);
        this.maxValue.on("data", (data: number) => this.receiveMaxValueData(data));
        this.minValue = new indicators.Min(this.fastKTimePeriod);
        this.minValue.on("data", (data: number) => this.receiveMinValueData(data));
        this.rsi = new indicators.RSI(this.timePeriod);
        this.rsi.on("data", (data: number) => this.receiveRSIData(data));
        this.fastDMA = new indicators.MovingAverage(this.fastDTimePeriod, this.fastDMAType);
        this.fastDMA.on("data", (data: number) => this.receiveFastDMAData(data));

        this.currentPeriodHigh = 0;
        this.currentPeriodLow = 0;
        this.fastDInternal = 0;
        this.fastKInternal = 0;
        this.currentRSI = 0;
        this.currentFastK = 0;
        this.currentFastDMA = 0;

        this.setLookBack(this.rsi.lookback + this.fastDMA.lookback + this.fastKTimePeriod - 1);
    }

    public get fastK(): number {
        return this.fastKInternal;
    }

    public get fastD(): number {
        return this.fastDInternal;
    }

    protected setCurrentValue(fastK: number, fastD: number) {
        this.fastKInternal = fastK;
        this.fastDInternal = fastD;
        this.emit("data", this.fastK, this.fastD);
        this.setIsReady();
    }

    receiveData(inputData: number): boolean {
        this.rsi.receiveData(inputData);
        return this.isReady;
    }

    private receiveFastDMAData(data: number) {
        this.currentFastDMA = data;
        this.setCurrentValue(this.currentFastK, this.currentFastDMA);
    }

    private receiveRSIData(data: number) {
        this.periodCounter += 1;
        this.currentRSI = data;
        this.maxValue.receiveData(data);
        this.minValue.receiveData(data);

        if (this.periodCounter >= 0) {
            let diff = this.currentPeriodHigh - this.currentPeriodLow;

            if (diff !== 0) {
                this.currentFastK = 100.0 * ((this.currentRSI - this.currentPeriodLow) / diff);
            } else {
                this.currentFastK = 0;
            }
            this.fastDMA.receiveData(this.currentFastK);
        }
    }

    private receiveMaxValueData(data: number) {
        this.currentPeriodHigh = data;
    }

    private receiveMinValueData(data: number) {
        this.currentPeriodLow = data;
    }
}

export class STOCHRSI extends StochasticRSI {

}
