import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const MEDPRICE_INDICATOR_NAME: string = "MEDPRICE";
export const MEDPRICE_INDICATOR_DESCR: string = "Median Price";

export class MEDPRICE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(MEDPRICE_INDICATOR_NAME, MEDPRICE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
