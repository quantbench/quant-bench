import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLRISEFALL3METHODS_INDICATOR_NAME: string = "CDLRISEFALL3METHODS";
export const CDLRISEFALL3METHODS_INDICATOR_DESCR: string = "Rising/Falling Three Methods";

export class CDLRISEFALL3METHODS
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLRISEFALL3METHODS_INDICATOR_NAME, CDLRISEFALL3METHODS_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
