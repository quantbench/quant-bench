import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLHANGINGMAN_INDICATOR_NAME: string = "CDLHANGINGMAN";
export const CDLHANGINGMAN_INDICATOR_DESCR: string = "Hanging Man";

export class CDLHANGINGMAN
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLHANGINGMAN_INDICATOR_NAME, CDLHANGINGMAN_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
