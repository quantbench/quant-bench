import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLBREAKAWAY
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLBREAKAWAY_INDICATOR_NAME: string = "CDLBREAKAWAY";
    static CDLBREAKAWAY_INDICATOR_DESCR: string = "Breakaway";

    constructor() {
        super(CDLBREAKAWAY.CDLBREAKAWAY_INDICATOR_NAME, CDLBREAKAWAY.CDLBREAKAWAY_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
