import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLIDENTICAL3CROWS
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLIDENTICAL3CROWS";
    static INDICATOR_DESCR: string = "Identical Three Crows";

    constructor() {
        super(CDLIDENTICAL3CROWS.INDICATOR_NAME, CDLIDENTICAL3CROWS.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
