import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLKICKING
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLKICKING";
    static INDICATOR_DESCR: string = "Kicking";

    constructor() {
        super(CDLKICKING.INDICATOR_NAME, CDLKICKING.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
