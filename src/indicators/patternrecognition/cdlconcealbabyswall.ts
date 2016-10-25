import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLCONCEALBABYSWALL
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLCONCEALBABYSWALL_INDICATOR_NAME: string = "CDLCONCEALBABYSWALL";
    static CDLCONCEALBABYSWALL_INDICATOR_DESCR: string = "Concealing Baby Swallow";

    constructor() {
        super(CDLCONCEALBABYSWALL.CDLCONCEALBABYSWALL_INDICATOR_NAME, CDLCONCEALBABYSWALL.CDLCONCEALBABYSWALL_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
