import * as indicators from "../";
import * as marketData from "../../data/market/";

export class STOCH
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "STOCH";
    static INDICATOR_DESCR: string = "Stochastic";

    constructor() {
        super(STOCH.INDICATOR_NAME, STOCH.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
