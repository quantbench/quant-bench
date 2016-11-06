import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLSHOOTINGSTAR
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLSHOOTINGSTAR";
    static INDICATOR_DESCR: string = "Shooting Star";

    constructor() {
        super(CDLSHOOTINGSTAR.INDICATOR_NAME, CDLSHOOTINGSTAR.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
