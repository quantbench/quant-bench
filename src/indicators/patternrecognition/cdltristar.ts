import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLTRISTAR
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLTRISTAR";
    static INDICATOR_DESCR: string = "Tristar Pattern";

    constructor() {
        super(CDLTRISTAR.INDICATOR_NAME, CDLTRISTAR.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
