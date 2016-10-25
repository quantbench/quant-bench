import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class NATR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static NATR_INDICATOR_NAME: string = "NATR";
    static NATR_INDICATOR_DESCR: string = "Normalized Average True Range";

    constructor() {
        super(NATR.NATR_INDICATOR_NAME, NATR.NATR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
