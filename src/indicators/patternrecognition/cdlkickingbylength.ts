import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLKICKINGBYLENGTH
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLKICKINGBYLENGTH";
    static INDICATOR_DESCR: string = "Kicking - bull/bear determined by the longer marubozu";

    constructor() {
        super(CDLKICKINGBYLENGTH.INDICATOR_NAME, CDLKICKINGBYLENGTH.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
