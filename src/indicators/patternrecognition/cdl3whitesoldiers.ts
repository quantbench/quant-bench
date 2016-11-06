import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDL3WHITESOLDIERS
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDL3WHITESOLDIERS";
    static INDICATOR_DESCR: string = "Three Advancing White Soldiers";

    constructor() {
        super(CDL3WHITESOLDIERS.INDICATOR_NAME, CDL3WHITESOLDIERS.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
