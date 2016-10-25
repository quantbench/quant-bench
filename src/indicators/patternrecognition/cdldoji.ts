import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLDOJI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLDOJI_INDICATOR_NAME: string = "CDLDOJI";
    static CDLDOJI_INDICATOR_DESCR: string = "Doji";

    constructor() {
        super(CDLDOJI.CDLDOJI_INDICATOR_NAME, CDLDOJI.CDLDOJI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
