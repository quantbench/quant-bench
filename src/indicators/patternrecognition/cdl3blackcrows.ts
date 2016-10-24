import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDL3BLACKCROWS_INDICATOR_NAME: string = "CDL3BLACKCROWS";
export const CDL3BLACKCROWS_INDICATOR_DESCR: string = "Three Black Crows";

export class CDL3BLACKCROWS
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDL3BLACKCROWS_INDICATOR_NAME, CDL3BLACKCROWS_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
