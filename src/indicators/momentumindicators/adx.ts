import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const ADX_INDICATOR_NAME: string = "ADX";
export const ADX_INDICATOR_DESCR: string = "Average Directional Movement Index";

export class ADX
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(ADX_INDICATOR_NAME, ADX_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
