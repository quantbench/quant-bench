import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class WILLR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static WILLR_INDICATOR_NAME: string = "WILLR";
    static WILLR_INDICATOR_DESCR: string = "Williams' %R";

    constructor() {
        super(WILLR.WILLR_INDICATOR_NAME, WILLR.WILLR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
