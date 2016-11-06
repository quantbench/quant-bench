import * as indicators from "../";
import * as marketData from "../../data/market/";

export class ATR
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "ATR";
    static INDICATOR_DESCR: string = "Average True Range";

    constructor() {
        super(ATR.INDICATOR_NAME, ATR.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
