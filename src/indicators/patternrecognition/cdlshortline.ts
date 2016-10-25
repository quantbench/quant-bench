import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLSHORTLINE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLSHORTLINE_INDICATOR_NAME: string = "CDLSHORTLINE";
    static CDLSHORTLINE_INDICATOR_DESCR: string = "Short Line Candle";

    constructor() {
        super(CDLSHORTLINE.CDLSHORTLINE_INDICATOR_NAME, CDLSHORTLINE.CDLSHORTLINE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
