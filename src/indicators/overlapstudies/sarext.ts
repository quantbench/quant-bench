import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class SAREXT
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static SAREXT_INDICATOR_NAME: string = "SAREXT";
    static SAREXT_INDICATOR_DESCR: string = "Parabolic SAR - Extended";

    constructor() {
        super(SAREXT.SAREXT_INDICATOR_NAME, SAREXT.SAREXT_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
