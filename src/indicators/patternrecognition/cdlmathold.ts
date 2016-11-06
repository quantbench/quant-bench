import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLMATHOLD
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLMATHOLD";
    static INDICATOR_DESCR: string = "Mat Hold";

    constructor() {
        super(CDLMATHOLD.INDICATOR_NAME, CDLMATHOLD.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
