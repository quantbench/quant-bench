import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLHANGINGMAN
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLHANGINGMAN_INDICATOR_NAME: string = "CDLHANGINGMAN";
    static CDLHANGINGMAN_INDICATOR_DESCR: string = "Hanging Man";

    constructor() {
        super(CDLHANGINGMAN.CDLHANGINGMAN_INDICATOR_NAME, CDLHANGINGMAN.CDLHANGINGMAN_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
