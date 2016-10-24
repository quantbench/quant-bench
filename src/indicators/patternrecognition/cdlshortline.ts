import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLSHORTLINE_INDICATOR_NAME: string = "CDLSHORTLINE";
export const CDLSHORTLINE_INDICATOR_DESCR: string = "Short Line Candle";

export class CDLSHORTLINE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLSHORTLINE_INDICATOR_NAME, CDLSHORTLINE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
