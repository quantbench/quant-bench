import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const AVGPRICE_INDICATOR_NAME: string = "AVGPRICE";
export const AVGPRICE_INDICATOR_DESCR: string = "Average Price";

export class AVGPRICE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(AVGPRICE_INDICATOR_NAME, AVGPRICE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
