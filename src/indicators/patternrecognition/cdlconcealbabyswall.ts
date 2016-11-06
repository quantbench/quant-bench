import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLCONCEALBABYSWALL
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLCONCEALBABYSWALL";
    static INDICATOR_DESCR: string = "Concealing Baby Swallow";

    constructor() {
        super(CDLCONCEALBABYSWALL.INDICATOR_NAME, CDLCONCEALBABYSWALL.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
