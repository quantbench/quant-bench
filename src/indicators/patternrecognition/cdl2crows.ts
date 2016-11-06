import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDL2CROWS
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDL2CROWS";
    static INDICATOR_DESCR: string = "Two Crows";

    constructor() {
        super(CDL2CROWS.INDICATOR_NAME, CDL2CROWS.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
