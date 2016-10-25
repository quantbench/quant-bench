import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLSPINNINGTOP
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLSPINNINGTOP_INDICATOR_NAME: string = "CDLSPINNINGTOP";
    static CDLSPINNINGTOP_INDICATOR_DESCR: string = "Spinning Top";

    constructor() {
        super(CDLSPINNINGTOP.CDLSPINNINGTOP_INDICATOR_NAME, CDLSPINNINGTOP.CDLSPINNINGTOP_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
