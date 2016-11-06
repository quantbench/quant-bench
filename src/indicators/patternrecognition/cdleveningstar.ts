import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLEVENINGSTAR
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLEVENINGSTAR";
    static INDICATOR_DESCR: string = "Evening Star";

    constructor() {
        super(CDLEVENINGSTAR.INDICATOR_NAME, CDLEVENINGSTAR.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
