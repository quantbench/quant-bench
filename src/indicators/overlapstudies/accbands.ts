import * as indicators from "../";
import * as marketData from "../../data/market/";

export class ACCBANDS
    extends indicators.AbstractIndicator<marketData.IPriceBar, indicators.TradingBand>
    implements indicators.IIndicator<marketData.IPriceBar, indicators.TradingBand> {

    static INDICATOR_NAME: string = "ACCBANDS";
    static INDICATOR_DESCR: string = "Acceleration Bands";
    static TIMEPERIOD_DEFAULT: number = 20;
    static TIMEPERIOD_MIN: number = 2;

    timePeriod: number;
    upperSMA: indicators.SMA;
    middleSMA: indicators.SMA;
    lowerSMA: indicators.SMA;

    constructor(timePeriod: number = ACCBANDS.TIMEPERIOD_DEFAULT) {
        super(ACCBANDS.INDICATOR_NAME, ACCBANDS.INDICATOR_DESCR);

        if (timePeriod < ACCBANDS.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, ACCBANDS.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.upperSMA = new indicators.SMA(this.timePeriod);
        this.middleSMA = new indicators.SMA(this.timePeriod);
        this.lowerSMA = new indicators.SMA(this.timePeriod);
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        let highPlusLow = inputData.high + inputData.low;
        let highMinusLow = inputData.high - inputData.low;
        let tempReal = 4 * highMinusLow / highPlusLow;

        this.middleSMA.receiveData(inputData.close);
        if (highPlusLow > 0) {
            this.upperSMA.receiveData(inputData.high * (1 + tempReal));
            this.lowerSMA.receiveData(inputData.low * (1 - tempReal));
        } else {
            this.upperSMA.receiveData(inputData.high);
            this.lowerSMA.receiveData(inputData.low);
        }

        if (this.middleSMA.isReady) {
            this.setCurrentValue(new indicators.TradingBand(
                this.upperSMA.currentValue,
                this.middleSMA.currentValue,
                this.lowerSMA.currentValue));
        }

        return this.isReady;
    }
}
