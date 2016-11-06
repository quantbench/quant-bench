import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLLADDERBOTTOM
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLLADDERBOTTOM";
    static INDICATOR_DESCR: string = "Ladder Bottom";

    constructor() {
        super(CDLLADDERBOTTOM.INDICATOR_NAME, CDLLADDERBOTTOM.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
