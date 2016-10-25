import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class TYPPRICE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static TYPPRICE_INDICATOR_NAME: string = "TYPPRICE";
    static TYPPRICE_INDICATOR_DESCR: string = "Typical Price";

    constructor() {
        super(TYPPRICE.TYPPRICE_INDICATOR_NAME, TYPPRICE.TYPPRICE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
