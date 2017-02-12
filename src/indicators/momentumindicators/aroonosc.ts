import * as indicators from "../";
import * as marketData from "../../data/market/";

export class AROONOSC
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "AROONOSC";
    static INDICATOR_DESCR: string = "Aroon Oscillator";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private aroon: indicators.AROON;

    constructor(timePeriod: number = AROONOSC.TIMEPERIOD_DEFAULT) {
        super(AROONOSC.INDICATOR_NAME, AROONOSC.INDICATOR_DESCR);

        if (timePeriod < AROONOSC.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, AROONOSC.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;

        this.aroon = new indicators.AROON(timePeriod);
        this.aroon.on("data", (aroonUpData: number, aroonDownData: number) => this.receiveAROONData(aroonUpData, aroonDownData));
        this.setLookBack(timePeriod);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.aroon.receiveData(inputData);
        return this.isReady;
    }

    private receiveAROONData(aroonUpData: number, aroonDownData: number) {
        this.setCurrentValue(aroonUpData - aroonDownData);
    }
}
