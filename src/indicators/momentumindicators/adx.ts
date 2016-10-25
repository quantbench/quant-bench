import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class ADX
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static ADX_INDICATOR_NAME: string = "ADX";
    static ADX_INDICATOR_DESCR: string = "Average Directional Movement Index";

    constructor() {
        super(ADX.ADX_INDICATOR_NAME, ADX.ADX_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
