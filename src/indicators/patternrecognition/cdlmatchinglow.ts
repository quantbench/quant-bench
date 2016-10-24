import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLMATCHINGLOW_INDICATOR_NAME: string = "CDLMATCHINGLOW";
export const CDLMATCHINGLOW_INDICATOR_DESCR: string = "Matching Low";

export class CDLMATCHINGLOW
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLMATCHINGLOW_INDICATOR_NAME, CDLMATCHINGLOW_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
