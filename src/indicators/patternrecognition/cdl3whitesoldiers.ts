import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDL3WHITESOLDIERS_INDICATOR_NAME: string = "CDL3WHITESOLDIERS";
export const CDL3WHITESOLDIERS_INDICATOR_DESCR: string = "Three Advancing White Soldiers";

export class CDL3WHITESOLDIERS
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDL3WHITESOLDIERS_INDICATOR_NAME, CDL3WHITESOLDIERS_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
