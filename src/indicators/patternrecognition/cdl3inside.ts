import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDL3INSIDE_INDICATOR_NAME: string = "CDL3INSIDE";
export const CDL3INSIDE_INDICATOR_DESCR: string = "Three Inside Up/Down";

export class CDL3INSIDE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDL3INSIDE_INDICATOR_NAME, CDL3INSIDE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
