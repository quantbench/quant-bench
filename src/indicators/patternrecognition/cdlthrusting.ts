import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLTHRUSTING
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLTHRUSTING";
    static INDICATOR_DESCR: string = "Thrusting Pattern";

    constructor() {
        super(CDLTHRUSTING.INDICATOR_NAME, CDLTHRUSTING.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
