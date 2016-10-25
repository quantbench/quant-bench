import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLGRAVESTONEDOJI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLGRAVESTONEDOJI_INDICATOR_NAME: string = "CDLGRAVESTONEDOJI";
    static CDLGRAVESTONEDOJI_INDICATOR_DESCR: string = "Gravestone Doji";

    constructor() {
        super(CDLGRAVESTONEDOJI.CDLGRAVESTONEDOJI_INDICATOR_NAME, CDLGRAVESTONEDOJI.CDLGRAVESTONEDOJI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
