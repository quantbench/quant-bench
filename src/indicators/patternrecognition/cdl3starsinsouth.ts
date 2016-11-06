import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDL3STARSINSOUTH
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDL3STARSINSOUTH";
    static INDICATOR_DESCR: string = "Three Stars In The South";

    constructor() {
        super(CDL3STARSINSOUTH.INDICATOR_NAME, CDL3STARSINSOUTH.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
