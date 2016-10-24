import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLSPINNINGTOP_INDICATOR_NAME: string = "CDLSPINNINGTOP";
export const CDLSPINNINGTOP_INDICATOR_DESCR: string = "Spinning Top";

export class CDLSPINNINGTOP
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLSPINNINGTOP_INDICATOR_NAME, CDLSPINNINGTOP_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
