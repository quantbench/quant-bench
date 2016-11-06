import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLRISEFALL3METHODS
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLRISEFALL3METHODS";
    static INDICATOR_DESCR: string = "Rising/Falling Three Methods";

    constructor() {
        super(CDLRISEFALL3METHODS.INDICATOR_NAME, CDLRISEFALL3METHODS.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
