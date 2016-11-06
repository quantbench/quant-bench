import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLCOUNTERATTACK
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLCOUNTERATTACK";
    static INDICATOR_DESCR: string = "Counterattack";

    constructor() {
        super(CDLCOUNTERATTACK.INDICATOR_NAME, CDLCOUNTERATTACK.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
