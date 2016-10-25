import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLMORNINGSTAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLMORNINGSTAR_INDICATOR_NAME: string = "CDLMORNINGSTAR";
    static CDLMORNINGSTAR_INDICATOR_DESCR: string = "Morning Star";

    constructor() {
        super(CDLMORNINGSTAR.CDLMORNINGSTAR_INDICATOR_NAME, CDLMORNINGSTAR.CDLMORNINGSTAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
