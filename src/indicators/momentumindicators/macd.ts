import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

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
    extends AbstractIndicator<number, MACDResult>
    implements indicators.IIndicator<number, MACDResult> {

    static MACD_INDICATOR_NAME: string = "MACD";
    static MACD_INDICATOR_DESCR: string = "Moving Average Convergence/Divergence";

    emaSlow: indicators.EMA;
    emaFast: indicators.EMA;
    emaSignal: indicators.EMA;
    currentFastEma: number;
    currentSlowEma: number;
    currentMacd: number;
    emaSlowSkip: number;
    periodCounter: number;

    constructor(slowTimePeriod: number, fastTimePeriod: number, signalTimePeriod: number) {
        super(MACD.MACD_INDICATOR_NAME, MACD.MACD_INDICATOR_DESCR);

        this.emaSlowSkip = slowTimePeriod - fastTimePeriod;
        this.emaFast = new indicators.EMA(fastTimePeriod);
        this.emaFast.on("data", (data: number) => this.receiveEmaFastData(data));
        this.emaSlow = new indicators.EMA(slowTimePeriod);
        this.emaSlow.on("data", (data: number) => this.receiveEmaSlowData(data));
        this.emaSignal = new indicators.EMA(signalTimePeriod);
        this.emaSignal.on("data", (data: number) => this.receiveEmaSignalData(data));
        this.periodCounter = 0;
        this.setLookBack(slowTimePeriod + signalTimePeriod - 2);
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
