import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLBELTHOLD
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLBELTHOLD";
    static INDICATOR_DESCR: string = "Belt-hold";

    constructor() {
        super(CDLBELTHOLD.INDICATOR_NAME, CDLBELTHOLD.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
