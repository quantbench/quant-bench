import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLBREAKAWAY
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLBREAKAWAY";
    static INDICATOR_DESCR: string = "Breakaway";

    constructor() {
        super(CDLBREAKAWAY.INDICATOR_NAME, CDLBREAKAWAY.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
