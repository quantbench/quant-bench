import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLMORNINGDOJISTAR_INDICATOR_NAME: string = "CDLMORNINGDOJISTAR";
export const CDLMORNINGDOJISTAR_INDICATOR_DESCR: string = "Morning Doji Star";

export class CDLMORNINGDOJISTAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLMORNINGDOJISTAR_INDICATOR_NAME, CDLMORNINGDOJISTAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
