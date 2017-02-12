import * as indicators from "../";
import * as marketData from "../../data/market/";

export class TRANGE
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "TRANGE";
    static INDICATOR_DESCR: string = "True Range";

    previousClose: number;
    periodCounter: number;

    constructor() {
        super(TRANGE.INDICATOR_NAME, TRANGE.INDICATOR_DESCR);

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
