import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLONNECK
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLONNECK";
    static INDICATOR_DESCR: string = "On-Neck Pattern";

    constructor() {
        super(CDLONNECK.INDICATOR_NAME, CDLONNECK.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
