import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLDOJISTAR
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLDOJISTAR";
    static INDICATOR_DESCR: string = "Doji Star";

    constructor() {
        super(CDLDOJISTAR.INDICATOR_NAME, CDLDOJISTAR.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
