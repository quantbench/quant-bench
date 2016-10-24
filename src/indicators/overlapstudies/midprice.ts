import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const MIDPRICE_INDICATOR_NAME: string = "MIDPRICE";
export const MIDPRICE_INDICATOR_DESCR: string = "Midpoint Price over period";

export class MIDPRICE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(MIDPRICE_INDICATOR_NAME, MIDPRICE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
