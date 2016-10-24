import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const SAREXT_INDICATOR_NAME: string = "SAREXT";
export const SAREXT_INDICATOR_DESCR: string = "Parabolic SAR - Extended";

export class SAREXT
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(SAREXT_INDICATOR_NAME, SAREXT_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
