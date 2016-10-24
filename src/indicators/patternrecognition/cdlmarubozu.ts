import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLMARUBOZU_INDICATOR_NAME: string = "CDLMARUBOZU";
export const CDLMARUBOZU_INDICATOR_DESCR: string = "Marubozu";

export class CDLMARUBOZU
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLMARUBOZU_INDICATOR_NAME, CDLMARUBOZU_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
