import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLINNECK
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLINNECK_INDICATOR_NAME: string = "CDLINNECK";
    static CDLINNECK_INDICATOR_DESCR: string = "In-Neck Pattern";

    constructor() {
        super(CDLINNECK.CDLINNECK_INDICATOR_NAME, CDLINNECK.CDLINNECK_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
