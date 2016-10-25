import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class TRANGE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static TRANGE_INDICATOR_NAME: string = "TRANGE";
    static TRANGE_INDICATOR_DESCR: string = "True Range";

    constructor() {
        super(TRANGE.TRANGE_INDICATOR_NAME, TRANGE.TRANGE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
