import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLEVENINGDOJISTAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLEVENINGDOJISTAR_INDICATOR_NAME: string = "CDLEVENINGDOJISTAR";
    static CDLEVENINGDOJISTAR_INDICATOR_DESCR: string = "Evening Doji Star";

    constructor() {
        super(CDLEVENINGDOJISTAR.CDLEVENINGDOJISTAR_INDICATOR_NAME, CDLEVENINGDOJISTAR.CDLEVENINGDOJISTAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
