import * as indicators from "../";
import * as marketData from "../../data/market/";

export class BOP
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "BOP";
    static INDICATOR_DESCR: string = "Balance Of Power";

    constructor() {
        super(BOP.INDICATOR_NAME, BOP.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
