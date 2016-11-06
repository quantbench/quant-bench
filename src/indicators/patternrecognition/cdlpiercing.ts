import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLPIERCING
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLPIERCING";
    static INDICATOR_DESCR: string = "Piercing Pattern";

    constructor() {
        super(CDLPIERCING.INDICATOR_NAME, CDLPIERCING.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
