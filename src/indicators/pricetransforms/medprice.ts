import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class MEDPRICE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static MEDPRICE_INDICATOR_NAME: string = "MEDPRICE";
    static MEDPRICE_INDICATOR_DESCR: string = "Median Price";

    constructor() {
        super(MEDPRICE.MEDPRICE_INDICATOR_NAME, MEDPRICE.MEDPRICE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
