import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLSTALLEDPATTERN
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLSTALLEDPATTERN";
    static INDICATOR_DESCR: string = "Stalled Pattern";

    constructor() {
        super(CDLSTALLEDPATTERN.INDICATOR_NAME, CDLSTALLEDPATTERN.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
