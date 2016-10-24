import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLHAMMER_INDICATOR_NAME: string = "CDLHAMMER";
export const CDLHAMMER_INDICATOR_DESCR: string = "Hammer";

export class CDLHAMMER
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLHAMMER_INDICATOR_NAME, CDLHAMMER_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
