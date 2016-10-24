import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLMATHOLD_INDICATOR_NAME: string = "CDLMATHOLD";
export const CDLMATHOLD_INDICATOR_DESCR: string = "Mat Hold";

export class CDLMATHOLD
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLMATHOLD_INDICATOR_NAME, CDLMATHOLD_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
