import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLRICKSHAWMAN
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLRICKSHAWMAN_INDICATOR_NAME: string = "CDLRICKSHAWMAN";
    static CDLRICKSHAWMAN_INDICATOR_DESCR: string = "Rickshaw Man";

    constructor() {
        super(CDLRICKSHAWMAN.CDLRICKSHAWMAN_INDICATOR_NAME, CDLRICKSHAWMAN.CDLRICKSHAWMAN_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
