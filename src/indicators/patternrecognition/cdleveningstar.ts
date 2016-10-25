import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLEVENINGSTAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLEVENINGSTAR_INDICATOR_NAME: string = "CDLEVENINGSTAR";
    static CDLEVENINGSTAR_INDICATOR_DESCR: string = "Evening Star";

    constructor() {
        super(CDLEVENINGSTAR.CDLEVENINGSTAR_INDICATOR_NAME, CDLEVENINGSTAR.CDLEVENINGSTAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
