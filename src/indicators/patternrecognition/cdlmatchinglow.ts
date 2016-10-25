import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLMATCHINGLOW
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLMATCHINGLOW_INDICATOR_NAME: string = "CDLMATCHINGLOW";
    static CDLMATCHINGLOW_INDICATOR_DESCR: string = "Matching Low";

    constructor() {
        super(CDLMATCHINGLOW.CDLMATCHINGLOW_INDICATOR_NAME, CDLMATCHINGLOW.CDLMATCHINGLOW_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
