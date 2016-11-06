import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLEVENINGDOJISTAR
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLEVENINGDOJISTAR";
    static INDICATOR_DESCR: string = "Evening Doji Star";

    constructor() {
        super(CDLEVENINGDOJISTAR.INDICATOR_NAME, CDLEVENINGDOJISTAR.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
