import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class AROON
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static AROON_INDICATOR_NAME: string = "AROON";
    static AROON_INDICATOR_DESCR: string = "Aroon";

    constructor() {
        super(AROON.AROON_INDICATOR_NAME, AROON.AROON_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
