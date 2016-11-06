import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLENGULFING
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLENGULFING";
    static INDICATOR_DESCR: string = "Engulfing Pattern";

    constructor() {
        super(CDLENGULFING.INDICATOR_NAME, CDLENGULFING.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
