import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLDOJI_INDICATOR_NAME: string = "CDLDOJI";
export const CDLDOJI_INDICATOR_DESCR: string = "Doji";

export class CDLDOJI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLDOJI_INDICATOR_NAME, CDLDOJI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
