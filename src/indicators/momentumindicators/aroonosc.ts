import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class AROONOSC
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

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
        this.aroon.on("data", (data: indicators.AROONResult) => this.receiveAROONData(data));
        this.setLookBack(timePeriod);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.aroon.receiveData(inputData);
        return this.isReady;
    }

    receiveAROONData(data: indicators.AROONResult) {
        this.setCurrentValue(data.aroonUp - data.aroonDown);
    }
}
