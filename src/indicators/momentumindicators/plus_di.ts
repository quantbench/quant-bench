import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const PLUSDI_INDICATOR_NAME: string = "PLUSDI";
export const PLUSDI_INDICATOR_DESCR: string = "Plus Directional Indicator";

export class PLUSDI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(PLUSDI_INDICATOR_NAME, PLUSDI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
