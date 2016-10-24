import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const BOP_INDICATOR_NAME: string = "BOP";
export const BOP_INDICATOR_DESCR: string = "Balance Of Power";

export class BOP
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(BOP_INDICATOR_NAME, BOP_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
