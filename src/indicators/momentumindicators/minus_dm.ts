import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class MINUSDM
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static MINUSDM_INDICATOR_NAME: string = "MINUSDM";
    static MINUSDM_INDICATOR_DESCR: string = "Minus Directional Movement";

    constructor() {
        super(MINUSDM.MINUSDM_INDICATOR_NAME, MINUSDM.MINUSDM_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
