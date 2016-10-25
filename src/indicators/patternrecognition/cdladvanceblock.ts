import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLADVANCEBLOCK
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLADVANCEBLOCK_INDICATOR_NAME: string = "CDLADVANCEBLOCK";
    static CDLADVANCEBLOCK_INDICATOR_DESCR: string = "Advance Block";

    constructor() {
        super(CDLADVANCEBLOCK.CDLADVANCEBLOCK_INDICATOR_NAME, CDLADVANCEBLOCK.CDLADVANCEBLOCK_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
