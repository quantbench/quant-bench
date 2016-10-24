import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLBELTHOLD_INDICATOR_NAME: string = "CDLBELTHOLD";
export const CDLBELTHOLD_INDICATOR_DESCR: string = "Belt-hold";

export class CDLBELTHOLD
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLBELTHOLD_INDICATOR_NAME, CDLBELTHOLD_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
