import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLHIKKAKE
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLHIKKAKE";
    static INDICATOR_DESCR: string = "Hikkake Pattern";

    constructor() {
        super(CDLHIKKAKE.INDICATOR_NAME, CDLHIKKAKE.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
