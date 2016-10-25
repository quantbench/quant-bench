import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLHIKKAKE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLHIKKAKE_INDICATOR_NAME: string = "CDLHIKKAKE";
    static CDLHIKKAKE_INDICATOR_DESCR: string = "Hikkake Pattern";

    constructor() {
        super(CDLHIKKAKE.CDLHIKKAKE_INDICATOR_NAME, CDLHIKKAKE.CDLHIKKAKE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
