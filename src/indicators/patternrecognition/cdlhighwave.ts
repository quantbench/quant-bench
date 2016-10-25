import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLHIGHWAVE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLHIGHWAVE_INDICATOR_NAME: string = "CDLHIGHWAVE";
    static CDLHIGHWAVE_INDICATOR_DESCR: string = "High-Wave Candle";

    constructor() {
        super(CDLHIGHWAVE.CDLHIGHWAVE_INDICATOR_NAME, CDLHIGHWAVE.CDLHIGHWAVE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
