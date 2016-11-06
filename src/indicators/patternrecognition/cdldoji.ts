import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLDOJI
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLDOJI";
    static INDICATOR_DESCR: string = "Doji";

    constructor() {
        super(CDLDOJI.INDICATOR_NAME, CDLDOJI.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
