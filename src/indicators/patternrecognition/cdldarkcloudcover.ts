import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLDARKCLOUDCOVER
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLDARKCLOUDCOVER";
    static INDICATOR_DESCR: string = "Dark Cloud Cover";

    constructor() {
        super(CDLDARKCLOUDCOVER.INDICATOR_NAME, CDLDARKCLOUDCOVER.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
