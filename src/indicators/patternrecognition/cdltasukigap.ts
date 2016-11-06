import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLTASUKIGAP
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLTASUKIGAP";
    static INDICATOR_DESCR: string = "Tasuki Gap";

    constructor() {
        super(CDLTASUKIGAP.INDICATOR_NAME, CDLTASUKIGAP.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
