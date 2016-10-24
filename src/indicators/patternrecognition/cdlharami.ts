import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLHARAMI_INDICATOR_NAME: string = "CDLHARAMI";
export const CDLHARAMI_INDICATOR_DESCR: string = "Harami Pattern";

export class CDLHARAMI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLHARAMI_INDICATOR_NAME, CDLHARAMI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
