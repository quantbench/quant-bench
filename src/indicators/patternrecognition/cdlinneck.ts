import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLINNECK_INDICATOR_NAME: string = "CDLINNECK";
export const CDLINNECK_INDICATOR_DESCR: string = "In-Neck Pattern";

export class CDLINNECK
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLINNECK_INDICATOR_NAME, CDLINNECK_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
