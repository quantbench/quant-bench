import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLTHRUSTING
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLTHRUSTING_INDICATOR_NAME: string = "CDLTHRUSTING";
    static CDLTHRUSTING_INDICATOR_DESCR: string = "Thrusting Pattern";

    constructor() {
        super(CDLTHRUSTING.CDLTHRUSTING_INDICATOR_NAME, CDLTHRUSTING.CDLTHRUSTING_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
