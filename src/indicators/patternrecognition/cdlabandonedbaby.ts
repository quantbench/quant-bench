import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLABANDONEDBABY
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLABANDONEDBABY";
    static INDICATOR_DESCR: string = "Abandoned Baby";

    constructor() {
        super(CDLABANDONEDBABY.INDICATOR_NAME, CDLABANDONEDBABY.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
