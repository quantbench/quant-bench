import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class TRANGE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static TRANGE_INDICATOR_NAME: string = "TRANGE";
    static TRANGE_INDICATOR_DESCR: string = "True Range";

    previousClose: number;
    periodCounter: number;

    constructor() {
        super(TRANGE.TRANGE_INDICATOR_NAME, TRANGE.TRANGE_INDICATOR_DESCR);

        this.previousClose = 0;
        this.periodCounter = -1;
        this.setLookBack(1);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {

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
