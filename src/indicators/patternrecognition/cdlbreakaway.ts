import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLBREAKAWAY_INDICATOR_NAME: string = "CDLBREAKAWAY";
export const CDLBREAKAWAY_INDICATOR_DESCR: string = "Breakaway";

export class CDLBREAKAWAY
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLBREAKAWAY_INDICATOR_NAME, CDLBREAKAWAY_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
