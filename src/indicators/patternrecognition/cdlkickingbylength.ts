import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLKICKINGBYLENGTH_INDICATOR_NAME: string = "CDLKICKINGBYLENGTH";
export const CDLKICKINGBYLENGTH_INDICATOR_DESCR: string = "Kicking - bull/bear determined by the longer marubozu";

export class CDLKICKINGBYLENGTH
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLKICKINGBYLENGTH_INDICATOR_NAME, CDLKICKINGBYLENGTH_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
