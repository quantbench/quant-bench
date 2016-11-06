import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLHIKKAKEMOD
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLHIKKAKEMOD";
    static INDICATOR_DESCR: string = "Modified Hikkake Pattern";

    constructor() {
        super(CDLHIKKAKEMOD.INDICATOR_NAME, CDLHIKKAKEMOD.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
