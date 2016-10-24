import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const STOCH_INDICATOR_NAME: string = "STOCH";
export const STOCH_INDICATOR_DESCR: string = "Stochastic";

export class STOCH
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(STOCH_INDICATOR_NAME, STOCH_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
