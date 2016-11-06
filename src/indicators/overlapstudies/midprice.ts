import * as indicators from "../";
import * as marketData from "../../data/market/";

export class MIDPRICE
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "MIDPRICE";
    static INDICATOR_DESCR: string = "Midpoint Price over period";

    constructor() {
        super(MIDPRICE.INDICATOR_NAME, MIDPRICE.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
