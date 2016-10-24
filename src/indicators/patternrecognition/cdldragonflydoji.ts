import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLDRAGONFLYDOJI_INDICATOR_NAME: string = "CDLDRAGONFLYDOJI";
export const CDLDRAGONFLYDOJI_INDICATOR_DESCR: string = "Dragonfly Doji";

export class CDLDRAGONFLYDOJI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLDRAGONFLYDOJI_INDICATOR_NAME, CDLDRAGONFLYDOJI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
