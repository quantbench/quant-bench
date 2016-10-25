import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class STOCHF
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static STOCHF_INDICATOR_NAME: string = "STOCHF";
    static STOCHF_INDICATOR_DESCR: string = "Stochastic Fast";

    constructor() {
        super(STOCHF.STOCHF_INDICATOR_NAME, STOCHF.STOCHF_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
