import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLSHORTLINE
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLSHORTLINE";
    static INDICATOR_DESCR: string = "Short Line Candle";

    constructor() {
        super(CDLSHORTLINE.INDICATOR_NAME, CDLSHORTLINE.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
