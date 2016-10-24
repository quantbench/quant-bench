import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLHIGHWAVE_INDICATOR_NAME: string = "CDLHIGHWAVE";
export const CDLHIGHWAVE_INDICATOR_DESCR: string = "High-Wave Candle";

export class CDLHIGHWAVE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLHIGHWAVE_INDICATOR_NAME, CDLHIGHWAVE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
