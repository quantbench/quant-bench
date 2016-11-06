import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLMARUBOZU
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLMARUBOZU";
    static INDICATOR_DESCR: string = "Marubozu";

    constructor() {
        super(CDLMARUBOZU.INDICATOR_NAME, CDLMARUBOZU.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
