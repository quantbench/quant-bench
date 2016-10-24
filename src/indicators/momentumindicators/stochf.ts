import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const STOCHF_INDICATOR_NAME: string = "STOCHF";
export const STOCHF_INDICATOR_DESCR: string = "Stochastic Fast";

export class STOCHF
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(STOCHF_INDICATOR_NAME, STOCHF_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
