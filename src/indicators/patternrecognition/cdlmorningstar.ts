import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLMORNINGSTAR_INDICATOR_NAME: string = "CDLMORNINGSTAR";
export const CDLMORNINGSTAR_INDICATOR_DESCR: string = "Morning Star";

export class CDLMORNINGSTAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLMORNINGSTAR_INDICATOR_NAME, CDLMORNINGSTAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
