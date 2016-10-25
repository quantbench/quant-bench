import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLDRAGONFLYDOJI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLDRAGONFLYDOJI_INDICATOR_NAME: string = "CDLDRAGONFLYDOJI";
    static CDLDRAGONFLYDOJI_INDICATOR_DESCR: string = "Dragonfly Doji";

    constructor() {
        super(CDLDRAGONFLYDOJI.CDLDRAGONFLYDOJI_INDICATOR_NAME, CDLDRAGONFLYDOJI.CDLDRAGONFLYDOJI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
