import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLMATHOLD
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLMATHOLD_INDICATOR_NAME: string = "CDLMATHOLD";
    static CDLMATHOLD_INDICATOR_DESCR: string = "Mat Hold";

    constructor() {
        super(CDLMATHOLD.CDLMATHOLD_INDICATOR_NAME, CDLMATHOLD.CDLMATHOLD_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
