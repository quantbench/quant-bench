import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class MINUSDI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static MINUSDI_INDICATOR_NAME: string = "MINUSDI";
    static MINUSDI_INDICATOR_DESCR: string = "Minus Directional Indicator";

    constructor() {
        super(MINUSDI.MINUSDI_INDICATOR_NAME, MINUSDI.MINUSDI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
