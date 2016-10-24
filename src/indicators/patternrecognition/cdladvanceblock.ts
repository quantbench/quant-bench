import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLADVANCEBLOCK_INDICATOR_NAME: string = "CDLADVANCEBLOCK";
export const CDLADVANCEBLOCK_INDICATOR_DESCR: string = "Advance Block";

export class CDLADVANCEBLOCK
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLADVANCEBLOCK_INDICATOR_NAME, CDLADVANCEBLOCK_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
