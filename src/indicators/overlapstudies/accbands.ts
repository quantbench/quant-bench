import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const ACCBANDS_INDICATOR_NAME: string = "ACCBANDS";
export const ACCBANDS_INDICATOR_DESCR: string = "Acceleration Bands";
export const ACCBANDS_TIMEPERIOD_DEFAULT: number = 20;
export const ACCBANDS_TIMEPERIOD_MIN: number = 2;

export class ACCBANDS
    extends AbstractIndicator<marketData.IPriceBar, indicators.TradingBand>
    implements indicators.IIndicator<marketData.IPriceBar, indicators.TradingBand> {

    timePeriod: number;
    upperSMA: indicators.SMA;
    middleSMA: indicators.SMA;
    lowerSMA: indicators.SMA;

    constructor(timePeriod: number) {
        super(ACCBANDS_INDICATOR_NAME, ACCBANDS_INDICATOR_DESCR);
        if (timePeriod === undefined) {
            this.timePeriod = ACCBANDS_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < ACCBANDS_TIMEPERIOD_MIN) {
                throw (new Error(indicators.generateMinTimePeriodError(this.name, ACCBANDS_TIMEPERIOD_MIN, timePeriod)));
            }
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
            this.setIsReady();
        }

        return this.isReady;
    }
}
