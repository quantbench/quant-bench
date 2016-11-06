import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDL3BLACKCROWS
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDL3BLACKCROWS";
    static INDICATOR_DESCR: string = "Three Black Crows";

    constructor() {
        super(CDL3BLACKCROWS.INDICATOR_NAME, CDL3BLACKCROWS.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
