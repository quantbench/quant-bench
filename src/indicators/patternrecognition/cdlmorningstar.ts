import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLMORNINGSTAR
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLMORNINGSTAR";
    static INDICATOR_DESCR: string = "Morning Star";

    constructor() {
        super(CDLMORNINGSTAR.INDICATOR_NAME, CDLMORNINGSTAR.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
