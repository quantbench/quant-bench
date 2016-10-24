import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLONNECK_INDICATOR_NAME: string = "CDLONNECK";
export const CDLONNECK_INDICATOR_DESCR: string = "On-Neck Pattern";

export class CDLONNECK
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLONNECK_INDICATOR_NAME, CDLONNECK_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
