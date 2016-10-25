import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLMARUBOZU
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLMARUBOZU_INDICATOR_NAME: string = "CDLMARUBOZU";
    static CDLMARUBOZU_INDICATOR_DESCR: string = "Marubozu";

    constructor() {
        super(CDLMARUBOZU.CDLMARUBOZU_INDICATOR_NAME, CDLMARUBOZU.CDLMARUBOZU_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
