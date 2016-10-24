import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLHIKKAKE_INDICATOR_NAME: string = "CDLHIKKAKE";
export const CDLHIKKAKE_INDICATOR_DESCR: string = "Hikkake Pattern";

export class CDLHIKKAKE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLHIKKAKE_INDICATOR_NAME, CDLHIKKAKE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
