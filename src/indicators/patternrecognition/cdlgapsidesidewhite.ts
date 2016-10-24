import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLGAPSIDESIDEWHITE_INDICATOR_NAME: string = "CDLGAPSIDESIDEWHITE";
export const CDLGAPSIDESIDEWHITE_INDICATOR_DESCR: string = "Up/Down-gap side-by-side white lines";

export class CDLGAPSIDESIDEWHITE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLGAPSIDESIDEWHITE_INDICATOR_NAME, CDLGAPSIDESIDEWHITE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
