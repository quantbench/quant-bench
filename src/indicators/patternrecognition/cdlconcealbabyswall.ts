import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLCONCEALBABYSWALL_INDICATOR_NAME: string = "CDLCONCEALBABYSWALL";
export const CDLCONCEALBABYSWALL_INDICATOR_DESCR: string = "Concealing Baby Swallow";

export class CDLCONCEALBABYSWALL
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLCONCEALBABYSWALL_INDICATOR_NAME, CDLCONCEALBABYSWALL_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
