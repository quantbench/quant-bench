import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLHIGHWAVE
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLHIGHWAVE";
    static INDICATOR_DESCR: string = "High-Wave Candle";

    constructor() {
        super(CDLHIGHWAVE.INDICATOR_NAME, CDLHIGHWAVE.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
