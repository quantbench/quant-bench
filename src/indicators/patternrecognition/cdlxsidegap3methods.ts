import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLXSIDEGAP3METHODS
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLXSIDEGAP3METHODS_INDICATOR_NAME: string = "CDLXSIDEGAP3METHODS";
    static CDLXSIDEGAP3METHODS_INDICATOR_DESCR: string = "Upside/Downside Gap Three Methods";

    constructor() {
        super(CDLXSIDEGAP3METHODS.CDLXSIDEGAP3METHODS_INDICATOR_NAME, CDLXSIDEGAP3METHODS.CDLXSIDEGAP3METHODS_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
