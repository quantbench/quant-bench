import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLHARAMICROSS
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLHARAMICROSS";
    static INDICATOR_DESCR: string = "Harami Cross Pattern";

    constructor() {
        super(CDLHARAMICROSS.INDICATOR_NAME, CDLHARAMICROSS.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
