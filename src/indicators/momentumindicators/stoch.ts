import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class STOCH
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static STOCH_INDICATOR_NAME: string = "STOCH";
    static STOCH_INDICATOR_DESCR: string = "Stochastic";

    constructor() {
        super(STOCH.STOCH_INDICATOR_NAME, STOCH.STOCH_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
