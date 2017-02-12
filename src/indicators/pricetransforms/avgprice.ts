import * as indicators from "../";
import * as marketData from "../../data/market/";

export class AVGPRICE
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "AVGPRICE";
    static INDICATOR_DESCR: string = "Average Price";

    constructor() {
        super(AVGPRICE.INDICATOR_NAME, AVGPRICE.INDICATOR_DESCR);
        this.setLookBack(0);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.setCurrentValue((inputData.open + inputData.high + inputData.low + inputData.close) / 4.0);
        return this.isReady;
    }
}
