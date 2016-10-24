import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const WCLPRICE_INDICATOR_NAME: string = "WCLPRICE";
export const WCLPRICE_INDICATOR_DESCR: string = "Weighted Close Price";

export class WCLPRICE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(WCLPRICE_INDICATOR_NAME, WCLPRICE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
