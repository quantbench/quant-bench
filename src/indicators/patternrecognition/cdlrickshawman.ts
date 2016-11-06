import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLRICKSHAWMAN
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLRICKSHAWMAN";
    static INDICATOR_DESCR: string = "Rickshaw Man";

    constructor() {
        super(CDLRICKSHAWMAN.INDICATOR_NAME, CDLRICKSHAWMAN.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
