import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLTASUKIGAP
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLTASUKIGAP_INDICATOR_NAME: string = "CDLTASUKIGAP";
    static CDLTASUKIGAP_INDICATOR_DESCR: string = "Tasuki Gap";

    constructor() {
        super(CDLTASUKIGAP.CDLTASUKIGAP_INDICATOR_NAME, CDLTASUKIGAP.CDLTASUKIGAP_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
