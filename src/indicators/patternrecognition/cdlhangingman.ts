import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLHANGINGMAN
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLHANGINGMAN";
    static INDICATOR_DESCR: string = "Hanging Man";

    constructor() {
        super(CDLHANGINGMAN.INDICATOR_NAME, CDLHANGINGMAN.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
