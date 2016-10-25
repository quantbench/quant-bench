import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLSEPARATINGLINES
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLSEPARATINGLINES_INDICATOR_NAME: string = "CDLSEPARATINGLINES";
    static CDLSEPARATINGLINES_INDICATOR_DESCR: string = "Separating Lines";

    constructor() {
        super(CDLSEPARATINGLINES.CDLSEPARATINGLINES_INDICATOR_NAME, CDLSEPARATINGLINES.CDLSEPARATINGLINES_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
