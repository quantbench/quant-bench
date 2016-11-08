import * as indicators from "../";
import * as marketData from "../../data/market/";

export class NATR
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "NATR";
    static INDICATOR_DESCR: string = "Normalized Average True Range";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 1;

    public timePeriod: number;
    private atr: indicators.ATR;
    private currentClose: number;

    constructor(timePeriod: number = NATR.TIMEPERIOD_DEFAULT) {
        super(NATR.INDICATOR_NAME, NATR.INDICATOR_DESCR);

        if (timePeriod < NATR.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, NATR.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.currentClose = 0;
        this.atr = new indicators.ATR(this.timePeriod);
        this.atr.on("data", (data: number) => this.receiveATRData(data));

        this.setLookBack(this.timePeriod);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.currentClose = inputData.close;
        this.atr.receiveData(inputData);
        return this.isReady;
    }

    private receiveATRData(data: number) {
        this.setCurrentValue(this.atr.currentValue / this.currentClose * 100.0);
    }
}
