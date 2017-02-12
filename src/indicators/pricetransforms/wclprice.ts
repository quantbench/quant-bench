import * as indicators from "../";
import * as marketData from "../../data/market/";

export class WCLPRICE
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "WCLPRICE";
    static INDICATOR_DESCR: string = "Weighted Close Price";

    constructor() {
        super(WCLPRICE.INDICATOR_NAME, WCLPRICE.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.setCurrentValue((inputData.high + inputData.low + (inputData.close * 2.0)) / 4.0);
        return this.isReady;
    }
}
