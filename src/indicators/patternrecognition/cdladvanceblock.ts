import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLADVANCEBLOCK
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLADVANCEBLOCK";
    static INDICATOR_DESCR: string = "Advance Block";

    constructor() {
        super(CDLADVANCEBLOCK.INDICATOR_NAME, CDLADVANCEBLOCK.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
