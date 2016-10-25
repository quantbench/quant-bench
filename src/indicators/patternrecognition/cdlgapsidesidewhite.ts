import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLGAPSIDESIDEWHITE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLGAPSIDESIDEWHITE_INDICATOR_NAME: string = "CDLGAPSIDESIDEWHITE";
    static CDLGAPSIDESIDEWHITE_INDICATOR_DESCR: string = "Up/Down-gap side-by-side white lines";

    constructor() {
        super(CDLGAPSIDESIDEWHITE.CDLGAPSIDESIDEWHITE_INDICATOR_NAME, CDLGAPSIDESIDEWHITE.CDLGAPSIDESIDEWHITE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
