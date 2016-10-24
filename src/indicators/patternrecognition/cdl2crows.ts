import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDL2CROWS_INDICATOR_NAME: string = "CDL2CROWS";
export const CDL2CROWS_INDICATOR_DESCR: string = "Two Crows";

export class CDL2CROWS
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDL2CROWS_INDICATOR_NAME, CDL2CROWS_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
