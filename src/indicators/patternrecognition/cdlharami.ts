import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLHARAMI
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLHARAMI";
    static INDICATOR_DESCR: string = "Harami Pattern";

    constructor() {
        super(CDLHARAMI.INDICATOR_NAME, CDLHARAMI.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
