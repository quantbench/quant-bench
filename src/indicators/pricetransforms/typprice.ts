import * as indicators from "../";
import * as marketData from "../../data/market/";

export class TYPPRICE
    extends indicators.AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static INDICATOR_NAME: string = "TYPPRICE";
    static INDICATOR_DESCR: string = "Typical Price";

    constructor() {
        super(TYPPRICE.INDICATOR_NAME, TYPPRICE.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.setCurrentValue((inputData.high + inputData.low + inputData.close) / 3.0);
        return this.isReady;
    }
}
