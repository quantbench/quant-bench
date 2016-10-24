import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const WILLR_INDICATOR_NAME: string = "WILLR";
export const WILLR_INDICATOR_DESCR: string = "Williams' %R";

export class WILLR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(WILLR_INDICATOR_NAME, WILLR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
