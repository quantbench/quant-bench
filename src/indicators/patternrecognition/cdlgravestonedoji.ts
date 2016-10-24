import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLGRAVESTONEDOJI_INDICATOR_NAME: string = "CDLGRAVESTONEDOJI";
export const CDLGRAVESTONEDOJI_INDICATOR_DESCR: string = "Gravestone Doji";

export class CDLGRAVESTONEDOJI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLGRAVESTONEDOJI_INDICATOR_NAME, CDLGRAVESTONEDOJI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
