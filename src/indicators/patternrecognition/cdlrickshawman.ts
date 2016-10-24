import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLRICKSHAWMAN_INDICATOR_NAME: string = "CDLRICKSHAWMAN";
export const CDLRICKSHAWMAN_INDICATOR_DESCR: string = "Rickshaw Man";

export class CDLRICKSHAWMAN
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLRICKSHAWMAN_INDICATOR_NAME, CDLRICKSHAWMAN_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
