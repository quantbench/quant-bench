import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDL3OUTSIDE_INDICATOR_NAME: string = "CDL3OUTSIDE";
export const CDL3OUTSIDE_INDICATOR_DESCR: string = "Three Outside Up/Down";

export class CDL3OUTSIDE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDL3OUTSIDE_INDICATOR_NAME, CDL3OUTSIDE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
