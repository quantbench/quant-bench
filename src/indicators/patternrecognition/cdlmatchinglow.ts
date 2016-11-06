import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLMATCHINGLOW
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLMATCHINGLOW";
    static INDICATOR_DESCR: string = "Matching Low";

    constructor() {
        super(CDLMATCHINGLOW.INDICATOR_NAME, CDLMATCHINGLOW.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
