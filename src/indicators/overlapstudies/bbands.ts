import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const BBANDS_INDICATOR_NAME: string = "BBANDS";
export const BBANDS_INDICATOR_DESCR: string = "Bollinger Bands";
export const BBANDS_TIMEPERIOD_DEFAULT: number = 20;
export const BBANDS_TIMEPERIOD_MIN: number = 2;

export class BBANDS
    extends AbstractIndicator<marketData.IPriceBar, indicators.TradingBand>
    implements indicators.IIndicator<marketData.IPriceBar, indicators.TradingBand> {

    timePeriod: number;

    constructor(timePeriod: number) {
        super(BBANDS_INDICATOR_NAME, BBANDS_INDICATOR_DESCR);
        if (timePeriod === undefined) {
            this.timePeriod = BBANDS_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < BBANDS_TIMEPERIOD_MIN) {
                throw (new Error(indicators.generateMinTimePeriodError(this.name, BBANDS_TIMEPERIOD_MIN, timePeriod)));
            }
        }

        this.timePeriod = timePeriod;
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
