import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLINVERTEDHAMMER
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLINVERTEDHAMMER_INDICATOR_NAME: string = "CDLINVERTEDHAMMER";
    static CDLINVERTEDHAMMER_INDICATOR_DESCR: string = "Inverted Hammer";

    constructor() {
        super(CDLINVERTEDHAMMER.CDLINVERTEDHAMMER_INDICATOR_NAME, CDLINVERTEDHAMMER.CDLINVERTEDHAMMER_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
