import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLSTICKSANDWICH_INDICATOR_NAME: string = "CDLSTICKSANDWICH";
export const CDLSTICKSANDWICH_INDICATOR_DESCR: string = "Stick Sandwich";

export class CDLSTICKSANDWICH
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLSTICKSANDWICH_INDICATOR_NAME, CDLSTICKSANDWICH_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
