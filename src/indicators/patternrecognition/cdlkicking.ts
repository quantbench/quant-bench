import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLKICKING_INDICATOR_NAME: string = "CDLKICKING";
export const CDLKICKING_INDICATOR_DESCR: string = "Kicking";

export class CDLKICKING
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLKICKING_INDICATOR_NAME, CDLKICKING_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
