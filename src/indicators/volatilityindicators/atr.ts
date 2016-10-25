import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class ATR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static ATR_INDICATOR_NAME: string = "ATR";
    static ATR_INDICATOR_DESCR: string = "Average True Range";

    constructor() {
        super(ATR.ATR_INDICATOR_NAME, ATR.ATR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
