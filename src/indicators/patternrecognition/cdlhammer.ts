import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLHAMMER
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLHAMMER_INDICATOR_NAME: string = "CDLHAMMER";
    static CDLHAMMER_INDICATOR_DESCR: string = "Hammer";

    constructor() {
        super(CDLHAMMER.CDLHAMMER_INDICATOR_NAME, CDLHAMMER.CDLHAMMER_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
