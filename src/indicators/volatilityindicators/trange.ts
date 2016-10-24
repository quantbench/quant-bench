import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const TRANGE_INDICATOR_NAME: string = "TRANGE";
export const TRANGE_INDICATOR_DESCR: string = "True Range";

export class TRANGE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(TRANGE_INDICATOR_NAME, TRANGE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
