import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLSTICKSANDWICH
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLSTICKSANDWICH_INDICATOR_NAME: string = "CDLSTICKSANDWICH";
    static CDLSTICKSANDWICH_INDICATOR_DESCR: string = "Stick Sandwich";

    constructor() {
        super(CDLSTICKSANDWICH.CDLSTICKSANDWICH_INDICATOR_NAME, CDLSTICKSANDWICH.CDLSTICKSANDWICH_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
