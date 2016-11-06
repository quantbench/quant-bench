import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLGAPSIDESIDEWHITE
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLGAPSIDESIDEWHITE";
    static INDICATOR_DESCR: string = "Up/Down-gap side-by-side white lines";

    constructor() {
        super(CDLGAPSIDESIDEWHITE.INDICATOR_NAME, CDLGAPSIDESIDEWHITE.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
