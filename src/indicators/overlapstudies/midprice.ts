import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class MIDPRICE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static MIDPRICE_INDICATOR_NAME: string = "MIDPRICE";
    static MIDPRICE_INDICATOR_DESCR: string = "Midpoint Price over period";

    constructor() {
        super(MIDPRICE.MIDPRICE_INDICATOR_NAME, MIDPRICE.MIDPRICE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
