import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLCLOSINGMARUBOZU
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLCLOSINGMARUBOZU";
    static INDICATOR_DESCR: string = "Closing Marubozu";

    constructor() {
        super(CDLCLOSINGMARUBOZU.INDICATOR_NAME, CDLCLOSINGMARUBOZU.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
