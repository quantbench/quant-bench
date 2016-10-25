import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLMORNINGDOJISTAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLMORNINGDOJISTAR_INDICATOR_NAME: string = "CDLMORNINGDOJISTAR";
    static CDLMORNINGDOJISTAR_INDICATOR_DESCR: string = "Morning Doji Star";

    constructor() {
        super(CDLMORNINGDOJISTAR.CDLMORNINGDOJISTAR_INDICATOR_NAME, CDLMORNINGDOJISTAR.CDLMORNINGDOJISTAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
