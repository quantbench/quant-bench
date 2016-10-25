import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLKICKINGBYLENGTH
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLKICKINGBYLENGTH_INDICATOR_NAME: string = "CDLKICKINGBYLENGTH";
    static CDLKICKINGBYLENGTH_INDICATOR_DESCR: string = "Kicking - bull/bear determined by the longer marubozu";

    constructor() {
        super(CDLKICKINGBYLENGTH.CDLKICKINGBYLENGTH_INDICATOR_NAME, CDLKICKINGBYLENGTH.CDLKICKINGBYLENGTH_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
