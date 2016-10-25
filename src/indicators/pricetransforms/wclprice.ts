import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class WCLPRICE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static WCLPRICE_INDICATOR_NAME: string = "WCLPRICE";
    static WCLPRICE_INDICATOR_DESCR: string = "Weighted Close Price";

    constructor() {
        super(WCLPRICE.WCLPRICE_INDICATOR_NAME, WCLPRICE.WCLPRICE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
