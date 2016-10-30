import * as indicators from "../";
import * as marketData from "../../data/market/";

export class MEDPRICE
    extends indicators.AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static INDICATOR_NAME: string = "MEDPRICE";
    static INDICATOR_DESCR: string = "Median Price";

    constructor() {
        super(MEDPRICE.INDICATOR_NAME, MEDPRICE.INDICATOR_DESCR);
        this.setLookBack(0);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.setCurrentValue((inputData.high + inputData.low) / 2.0);
        return this.isReady;
    }
}
