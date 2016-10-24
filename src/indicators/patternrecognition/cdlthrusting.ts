import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLTHRUSTING_INDICATOR_NAME: string = "CDLTHRUSTING";
export const CDLTHRUSTING_INDICATOR_DESCR: string = "Thrusting Pattern";

export class CDLTHRUSTING
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLTHRUSTING_INDICATOR_NAME, CDLTHRUSTING_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
