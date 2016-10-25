import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLONNECK
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLONNECK_INDICATOR_NAME: string = "CDLONNECK";
    static CDLONNECK_INDICATOR_DESCR: string = "On-Neck Pattern";

    constructor() {
        super(CDLONNECK.CDLONNECK_INDICATOR_NAME, CDLONNECK.CDLONNECK_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
