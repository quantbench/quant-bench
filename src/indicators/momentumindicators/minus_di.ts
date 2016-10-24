import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const MINUSDI_INDICATOR_NAME: string = "MINUSDI";
export const MINUSDI_INDICATOR_DESCR: string = "Minus Directional Indicator";

export class MINUSDI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(MINUSDI_INDICATOR_NAME, MINUSDI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
