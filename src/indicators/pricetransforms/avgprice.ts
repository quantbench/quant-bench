import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class AVGPRICE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static AVGPRICE_INDICATOR_NAME: string = "AVGPRICE";
    static AVGPRICE_INDICATOR_DESCR: string = "Average Price";

    constructor() {
        super(AVGPRICE.AVGPRICE_INDICATOR_NAME, AVGPRICE.AVGPRICE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
