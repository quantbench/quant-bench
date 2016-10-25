import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLCLOSINGMARUBOZU
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLCLOSINGMARUBOZU_INDICATOR_NAME: string = "CDLCLOSINGMARUBOZU";
    static CDLCLOSINGMARUBOZU_INDICATOR_DESCR: string = "Closing Marubozu";

    constructor() {
        super(CDLCLOSINGMARUBOZU.CDLCLOSINGMARUBOZU_INDICATOR_NAME, CDLCLOSINGMARUBOZU.CDLCLOSINGMARUBOZU_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
