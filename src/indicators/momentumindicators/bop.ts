import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class BOP
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static BOP_INDICATOR_NAME: string = "BOP";
    static BOP_INDICATOR_DESCR: string = "Balance Of Power";

    constructor() {
        super(BOP.BOP_INDICATOR_NAME, BOP.BOP_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
