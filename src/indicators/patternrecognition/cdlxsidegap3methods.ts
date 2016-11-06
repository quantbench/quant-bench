import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLXSIDEGAP3METHODS
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLXSIDEGAP3METHODS";
    static INDICATOR_DESCR: string = "Upside/Downside Gap Three Methods";

    constructor() {
        super(CDLXSIDEGAP3METHODS.INDICATOR_NAME, CDLXSIDEGAP3METHODS.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
