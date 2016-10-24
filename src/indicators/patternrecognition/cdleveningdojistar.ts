import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLEVENINGDOJISTAR_INDICATOR_NAME: string = "CDLEVENINGDOJISTAR";
export const CDLEVENINGDOJISTAR_INDICATOR_DESCR: string = "Evening Doji Star";

export class CDLEVENINGDOJISTAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLEVENINGDOJISTAR_INDICATOR_NAME, CDLEVENINGDOJISTAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
