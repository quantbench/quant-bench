import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLENGULFING
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLENGULFING_INDICATOR_NAME: string = "CDLENGULFING";
    static CDLENGULFING_INDICATOR_DESCR: string = "Engulfing Pattern";

    constructor() {
        super(CDLENGULFING.CDLENGULFING_INDICATOR_NAME, CDLENGULFING.CDLENGULFING_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
