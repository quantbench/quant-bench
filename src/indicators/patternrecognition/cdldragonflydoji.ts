import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLDRAGONFLYDOJI
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLDRAGONFLYDOJI";
    static INDICATOR_DESCR: string = "Dragonfly Doji";

    constructor() {
        super(CDLDRAGONFLYDOJI.INDICATOR_NAME, CDLDRAGONFLYDOJI.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
