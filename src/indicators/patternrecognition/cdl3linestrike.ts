import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDL3LINESTRIKE_INDICATOR_NAME: string = "CDL3LINESTRIKE";
export const CDL3LINESTRIKE_INDICATOR_DESCR: string = "Three-Line Strike ";

export class CDL3LINESTRIKE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDL3LINESTRIKE_INDICATOR_NAME, CDL3LINESTRIKE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
