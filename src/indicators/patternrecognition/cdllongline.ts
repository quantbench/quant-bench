import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLLONGLINE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLLONGLINE_INDICATOR_NAME: string = "CDLLONGLINE";
    static CDLLONGLINE_INDICATOR_DESCR: string = "Long Line Candle";

    constructor() {
        super(CDLLONGLINE.CDLLONGLINE_INDICATOR_NAME, CDLLONGLINE.CDLLONGLINE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
