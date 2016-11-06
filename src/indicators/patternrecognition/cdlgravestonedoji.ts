import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLGRAVESTONEDOJI
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLGRAVESTONEDOJI";
    static INDICATOR_DESCR: string = "Gravestone Doji";

    constructor() {
        super(CDLGRAVESTONEDOJI.INDICATOR_NAME, CDLGRAVESTONEDOJI.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
