import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLENGULFING_INDICATOR_NAME: string = "CDLENGULFING";
export const CDLENGULFING_INDICATOR_DESCR: string = "Engulfing Pattern";

export class CDLENGULFING
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLENGULFING_INDICATOR_NAME, CDLENGULFING_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
