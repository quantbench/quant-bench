import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLSPINNINGTOP
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLSPINNINGTOP";
    static INDICATOR_DESCR: string = "Spinning Top";

    constructor() {
        super(CDLSPINNINGTOP.INDICATOR_NAME, CDLSPINNINGTOP.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
