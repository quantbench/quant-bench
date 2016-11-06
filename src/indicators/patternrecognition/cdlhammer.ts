import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLHAMMER
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLHAMMER";
    static INDICATOR_DESCR: string = "Hammer";

    constructor() {
        super(CDLHAMMER.INDICATOR_NAME, CDLHAMMER.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
