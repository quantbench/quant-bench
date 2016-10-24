import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLSEPARATINGLINES_INDICATOR_NAME: string = "CDLSEPARATINGLINES";
export const CDLSEPARATINGLINES_INDICATOR_DESCR: string = "Separating Lines";

export class CDLSEPARATINGLINES
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLSEPARATINGLINES_INDICATOR_NAME, CDLSEPARATINGLINES_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
