import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLLONGLINE
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLLONGLINE";
    static INDICATOR_DESCR: string = "Long Line Candle";

    constructor() {
        super(CDLLONGLINE.INDICATOR_NAME, CDLLONGLINE.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
