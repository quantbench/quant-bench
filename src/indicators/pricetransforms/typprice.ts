import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const TYPPRICE_INDICATOR_NAME: string = "TYPPRICE";
export const TYPPRICE_INDICATOR_DESCR: string = "Typical Price";

export class TYPPRICE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(TYPPRICE_INDICATOR_NAME, TYPPRICE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
