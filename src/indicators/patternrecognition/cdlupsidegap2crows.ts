import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLUPSIDEGAP2CROWS
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLUPSIDEGAP2CROWS";
    static INDICATOR_DESCR: string = "Upside Gap Two Crows";

    constructor() {
        super(CDLUPSIDEGAP2CROWS.INDICATOR_NAME, CDLUPSIDEGAP2CROWS.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
