import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLTAKURI
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLTAKURI";
    static INDICATOR_DESCR: string = "Takuri (Dragonfly Doji with very long lower shadow)";

    constructor() {
        super(CDLTAKURI.INDICATOR_NAME, CDLTAKURI.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
