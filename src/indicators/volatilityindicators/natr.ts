import * as indicators from "../";
import * as marketData from "../../data/market/";

export class NATR
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "NATR";
    static INDICATOR_DESCR: string = "Normalized Average True Range";

    constructor() {
        super(NATR.INDICATOR_NAME, NATR.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
