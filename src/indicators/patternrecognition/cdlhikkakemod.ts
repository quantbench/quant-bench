import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLHIKKAKEMOD_INDICATOR_NAME: string = "CDLHIKKAKEMOD";
export const CDLHIKKAKEMOD_INDICATOR_DESCR: string = "Modified Hikkake Pattern";

export class CDLHIKKAKEMOD
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLHIKKAKEMOD_INDICATOR_NAME, CDLHIKKAKEMOD_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
