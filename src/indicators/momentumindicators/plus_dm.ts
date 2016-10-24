import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const PLUSDM_INDICATOR_NAME: string = "PLUSDM";
export const PLUSDM_INDICATOR_DESCR: string = "Plus Directional Movement";

export class PLUSDM
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(PLUSDM_INDICATOR_NAME, PLUSDM_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
