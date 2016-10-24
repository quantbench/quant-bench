import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLTAKURI_INDICATOR_NAME: string = "CDLTAKURI";
export const CDLTAKURI_INDICATOR_DESCR: string = "Takuri (Dragonfly Doji with very long lower shadow)";

export class CDLTAKURI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLTAKURI_INDICATOR_NAME, CDLTAKURI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
