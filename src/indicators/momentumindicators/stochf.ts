import * as indicators from "../";
import * as marketData from "../../data/market/";

export class STOCHF
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "STOCHF";
    static INDICATOR_DESCR: string = "Stochastic Fast";

    constructor() {
        super(STOCHF.INDICATOR_NAME, STOCHF.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
