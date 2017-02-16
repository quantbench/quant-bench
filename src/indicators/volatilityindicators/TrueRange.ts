import * as indicators from "../";
import * as marketData from "../../data/market/";

export class TrueRange
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "TRANGE";
    static INDICATOR_DESCR: string = "True Range";

    previousClose: number;
    periodCounter: number;

    constructor() {
        super(TrueRange.INDICATOR_NAME, TrueRange.INDICATOR_DESCR);

        this.previousClose = 0;
        this.periodCounter = -1;
        this.setLookBack(1);
    }

    receiveData(inputData: marketData.PriceBar): boolean {

        this.periodCounter++;

        if (this.periodCounter > 0) {
            let high: number = inputData.high > this.previousClose ? inputData.high : this.previousClose;
            let low: number = inputData.low < this.previousClose ? inputData.low : this.previousClose;
            this.setCurrentValue(high - low);
        }
        this.previousClose = inputData.close;

        return this.isReady;
    }
}

export class TRANGE extends TrueRange {

}
