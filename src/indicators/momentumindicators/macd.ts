import * as indicators from "../";

export class MACDResult {
    macd: number;
    signal: number;
    histogram: number;

    constructor(macd: number, signal: number, histogram: number) {
        this.macd = macd;
        this.signal = signal;
        this.histogram = histogram;
    }
}

export class MACD
    extends indicators.AbstractIndicator<number, MACDResult>
    implements indicators.IIndicator<number, MACDResult> {

    static INDICATOR_NAME: string = "MACD";
    static INDICATOR_DESCR: string = "Moving Average Convergence/Divergence";
    static FAST_TIMEPERIOD_DEFAULT = 12;
    static FAST_TIMEPERIOD_MIN = 2;
    static SLOW_TIMEPERIOD_DEFAULT = 26;
    static SLOW_TIMEPERIOD_MIN = 2;
    static SIGNAL_TIMEPERIOD_DEFAULT = 9;
    static SIGNAL_TIMEPERIOD_MIN = 1;

    public fastTimePeriod: number;
    public slowTimePeriod: number;
    public signalTimePeriod: number;

    private emaSlow: indicators.EMA;
    private emaFast: indicators.EMA;
    private emaSignal: indicators.EMA;
    private currentFastEma: number;
    private currentSlowEma: number;
    private currentMacd: number;
    private emaSlowSkip: number;
    private periodCounter: number;

    constructor(fastTimePeriod: number = MACD.FAST_TIMEPERIOD_DEFAULT,
        slowTimePeriod: number = MACD.SLOW_TIMEPERIOD_DEFAULT,
        signalTimePeriod: number = MACD.SIGNAL_TIMEPERIOD_DEFAULT) {
        super(MACD.INDICATOR_NAME, MACD.INDICATOR_DESCR);

        if (fastTimePeriod < MACD.FAST_TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, MACD.FAST_TIMEPERIOD_MIN, fastTimePeriod)));
        }

        if (slowTimePeriod < MACD.SLOW_TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, MACD.SLOW_TIMEPERIOD_MIN, slowTimePeriod)));
        }

        if (signalTimePeriod < MACD.SIGNAL_TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, MACD.SIGNAL_TIMEPERIOD_MIN, signalTimePeriod)));
        }

        this.emaSlowSkip = slowTimePeriod - fastTimePeriod;
        this.emaFast = new indicators.EMA(fastTimePeriod);
        this.emaFast.on("data", (data: number) => this.receiveEmaFastData(data));
        this.emaSlow = new indicators.EMA(slowTimePeriod);
        this.emaSlow.on("data", (data: number) => this.receiveEmaSlowData(data));
        this.emaSignal = new indicators.EMA(signalTimePeriod);
        this.emaSignal.on("data", (data: number) => this.receiveEmaSignalData(data));
        this.periodCounter = 0;
        this.setLookBack(slowTimePeriod + signalTimePeriod - 2);
        this.fastTimePeriod = fastTimePeriod;
        this.slowTimePeriod = slowTimePeriod;
        this.signalTimePeriod = signalTimePeriod;
    }

    receiveData(inputData: number): boolean {

        this.periodCounter++;
        if (this.periodCounter > this.emaSlowSkip) {
            this.emaFast.receiveData(inputData);
        }

        this.emaSlow.receiveData(inputData);

        return this.isReady;
    }

    private receiveEmaSlowData(data: number) {
        this.currentSlowEma = data;
        this.currentMacd = this.currentFastEma - this.currentSlowEma;
        this.emaSignal.receiveData(this.currentMacd);
    }

    private receiveEmaFastData(data: number) {
        this.currentFastEma = data;
    }

    private receiveEmaSignalData(data: number) {
        // Macd Line: (12-day EmaWithoutStorage - 26-day EmaWithoutStorage)
        // Signal Line: 9-day EmaWithoutStorage of Macd Line
        // Macd Histogram: Macd Line - Signal Line
        let macd: number = this.currentFastEma - this.currentSlowEma;
        let signal: number = data;
        let histogram: number = macd - signal;
        this.setCurrentValue(new MACDResult(macd, signal, histogram));
    }
}
