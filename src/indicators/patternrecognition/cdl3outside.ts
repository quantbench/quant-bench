import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDL3OUTSIDE
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDL3OUTSIDE";
    static INDICATOR_DESCR: string = "Three Outside Up/Down";

    constructor() {
        super(CDL3OUTSIDE.INDICATOR_NAME, CDL3OUTSIDE.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
