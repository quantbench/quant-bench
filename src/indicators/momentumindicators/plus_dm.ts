import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class PLUSDM
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static PLUSDM_INDICATOR_NAME: string = "PLUSDM";
    static PLUSDM_INDICATOR_DESCR: string = "Plus Directional Movement";

    constructor() {
        super(PLUSDM.PLUSDM_INDICATOR_NAME, PLUSDM.PLUSDM_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
