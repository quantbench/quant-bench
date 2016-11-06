import * as indicators from "../";
import * as marketData from "../../data/market/";

export class SAREXT
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "SAREXT";
    static INDICATOR_DESCR: string = "Parabolic SAR - Extended";

    constructor() {
        super(SAREXT.INDICATOR_NAME, SAREXT.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
