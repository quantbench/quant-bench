import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLUNIQUE3RIVER
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLUNIQUE3RIVER";
    static INDICATOR_DESCR: string = "Unique 3 River";

    constructor() {
        super(CDLUNIQUE3RIVER.INDICATOR_NAME, CDLUNIQUE3RIVER.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
