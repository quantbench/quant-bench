import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLSTALLEDPATTERN_INDICATOR_NAME: string = "CDLSTALLEDPATTERN";
export const CDLSTALLEDPATTERN_INDICATOR_DESCR: string = "Stalled Pattern";

export class CDLSTALLEDPATTERN
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLSTALLEDPATTERN_INDICATOR_NAME, CDLSTALLEDPATTERN_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
