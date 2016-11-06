import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDL3INSIDE
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDL3INSIDE";
    static INDICATOR_DESCR: string = "Three Inside Up/Down";

    constructor() {
        super(CDL3INSIDE.INDICATOR_NAME, CDL3INSIDE.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
