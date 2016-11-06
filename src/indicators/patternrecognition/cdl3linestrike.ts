import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDL3LINESTRIKE
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDL3LINESTRIKE";
    static INDICATOR_DESCR: string = "Three-Line Strike ";

    constructor() {
        super(CDL3LINESTRIKE.INDICATOR_NAME, CDL3LINESTRIKE.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
