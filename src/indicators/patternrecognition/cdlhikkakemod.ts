import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLHIKKAKEMOD
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLHIKKAKEMOD_INDICATOR_NAME: string = "CDLHIKKAKEMOD";
    static CDLHIKKAKEMOD_INDICATOR_DESCR: string = "Modified Hikkake Pattern";

    constructor() {
        super(CDLHIKKAKEMOD.CDLHIKKAKEMOD_INDICATOR_NAME, CDLHIKKAKEMOD.CDLHIKKAKEMOD_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
