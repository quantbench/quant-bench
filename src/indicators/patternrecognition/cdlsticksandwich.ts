import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLSTICKSANDWICH
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLSTICKSANDWICH";
    static INDICATOR_DESCR: string = "Stick Sandwich";

    constructor() {
        super(CDLSTICKSANDWICH.INDICATOR_NAME, CDLSTICKSANDWICH.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
