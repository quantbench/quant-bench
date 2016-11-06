import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLINVERTEDHAMMER
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLINVERTEDHAMMER";
    static INDICATOR_DESCR: string = "Inverted Hammer";

    constructor() {
        super(CDLINVERTEDHAMMER.INDICATOR_NAME, CDLINVERTEDHAMMER.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
