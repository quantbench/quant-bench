import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLLONGLINE_INDICATOR_NAME: string = "CDLLONGLINE";
export const CDLLONGLINE_INDICATOR_DESCR: string = "Long Line Candle";

export class CDLLONGLINE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLLONGLINE_INDICATOR_NAME, CDLLONGLINE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
