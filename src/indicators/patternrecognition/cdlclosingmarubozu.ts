import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLCLOSINGMARUBOZU_INDICATOR_NAME: string = "CDLCLOSINGMARUBOZU";
export const CDLCLOSINGMARUBOZU_INDICATOR_DESCR: string = "Closing Marubozu";

export class CDLCLOSINGMARUBOZU
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLCLOSINGMARUBOZU_INDICATOR_NAME, CDLCLOSINGMARUBOZU_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
