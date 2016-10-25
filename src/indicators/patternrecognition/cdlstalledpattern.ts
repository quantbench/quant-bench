import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLSTALLEDPATTERN
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLSTALLEDPATTERN_INDICATOR_NAME: string = "CDLSTALLEDPATTERN";
    static CDLSTALLEDPATTERN_INDICATOR_DESCR: string = "Stalled Pattern";

    constructor() {
        super(CDLSTALLEDPATTERN.CDLSTALLEDPATTERN_INDICATOR_NAME, CDLSTALLEDPATTERN.CDLSTALLEDPATTERN_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
