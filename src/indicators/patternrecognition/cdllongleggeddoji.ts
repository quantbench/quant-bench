import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLLONGLEGGEDDOJI
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLLONGLEGGEDDOJI";
    static INDICATOR_DESCR: string = "Long Legged Doji";

    constructor() {
        super(CDLLONGLEGGEDDOJI.INDICATOR_NAME, CDLLONGLEGGEDDOJI.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
