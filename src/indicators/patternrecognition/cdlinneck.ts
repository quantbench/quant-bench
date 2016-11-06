import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLINNECK
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLINNECK";
    static INDICATOR_DESCR: string = "In-Neck Pattern";

    constructor() {
        super(CDLINNECK.INDICATOR_NAME, CDLINNECK.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
