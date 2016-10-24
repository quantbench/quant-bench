import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const MINUSDM_INDICATOR_NAME: string = "MINUSDM";
export const MINUSDM_INDICATOR_DESCR: string = "Minus Directional Movement";

export class MINUSDM
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(MINUSDM_INDICATOR_NAME, MINUSDM_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
