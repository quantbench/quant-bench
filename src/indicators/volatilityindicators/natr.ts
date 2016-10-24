import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const NATR_INDICATOR_NAME: string = "NATR";
export const NATR_INDICATOR_DESCR: string = "Normalized Average True Range";

export class NATR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(NATR_INDICATOR_NAME, NATR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
