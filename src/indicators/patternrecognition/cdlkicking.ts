import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLKICKING
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLKICKING_INDICATOR_NAME: string = "CDLKICKING";
    static CDLKICKING_INDICATOR_DESCR: string = "Kicking";

    constructor() {
        super(CDLKICKING.CDLKICKING_INDICATOR_NAME, CDLKICKING.CDLKICKING_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
