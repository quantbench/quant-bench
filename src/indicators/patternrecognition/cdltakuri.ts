import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLTAKURI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLTAKURI_INDICATOR_NAME: string = "CDLTAKURI";
    static CDLTAKURI_INDICATOR_DESCR: string = "Takuri (Dragonfly Doji with very long lower shadow)";

    constructor() {
        super(CDLTAKURI.CDLTAKURI_INDICATOR_NAME, CDLTAKURI.CDLTAKURI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
