import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLXSIDEGAP3METHODS_INDICATOR_NAME: string = "CDLXSIDEGAP3METHODS";
export const CDLXSIDEGAP3METHODS_INDICATOR_DESCR: string = "Upside/Downside Gap Three Methods";

export class CDLXSIDEGAP3METHODS
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLXSIDEGAP3METHODS_INDICATOR_NAME, CDLXSIDEGAP3METHODS_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
