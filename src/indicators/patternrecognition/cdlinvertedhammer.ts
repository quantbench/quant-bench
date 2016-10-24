import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLINVERTEDHAMMER_INDICATOR_NAME: string = "CDLINVERTEDHAMMER";
export const CDLINVERTEDHAMMER_INDICATOR_DESCR: string = "Inverted Hammer";

export class CDLINVERTEDHAMMER
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLINVERTEDHAMMER_INDICATOR_NAME, CDLINVERTEDHAMMER_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
