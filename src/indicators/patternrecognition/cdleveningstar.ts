import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLEVENINGSTAR_INDICATOR_NAME: string = "CDLEVENINGSTAR";
export const CDLEVENINGSTAR_INDICATOR_DESCR: string = "Evening Star";

export class CDLEVENINGSTAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLEVENINGSTAR_INDICATOR_NAME, CDLEVENINGSTAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
