import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLSEPARATINGLINES
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLSEPARATINGLINES";
    static INDICATOR_DESCR: string = "Separating Lines";

    constructor() {
        super(CDLSEPARATINGLINES.INDICATOR_NAME, CDLSEPARATINGLINES.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
