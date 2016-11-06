import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLMORNINGDOJISTAR
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLMORNINGDOJISTAR";
    static INDICATOR_DESCR: string = "Morning Doji Star";

    constructor() {
        super(CDLMORNINGDOJISTAR.INDICATOR_NAME, CDLMORNINGDOJISTAR.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
