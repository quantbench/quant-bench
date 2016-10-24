import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLTASUKIGAP_INDICATOR_NAME: string = "CDLTASUKIGAP";
export const CDLTASUKIGAP_INDICATOR_DESCR: string = "Tasuki Gap";

export class CDLTASUKIGAP
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLTASUKIGAP_INDICATOR_NAME, CDLTASUKIGAP_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
