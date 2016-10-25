import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLBELTHOLD
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLBELTHOLD_INDICATOR_NAME: string = "CDLBELTHOLD";
    static CDLBELTHOLD_INDICATOR_DESCR: string = "Belt-hold";

    constructor() {
        super(CDLBELTHOLD.CDLBELTHOLD_INDICATOR_NAME, CDLBELTHOLD.CDLBELTHOLD_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
