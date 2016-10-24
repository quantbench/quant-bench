import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const ULTOSC_INDICATOR_NAME: string = "ULTOSC";
export const ULTOSC_INDICATOR_DESCR: string = "Ultimate Oscillator";

export class ULTOSC
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(ULTOSC_INDICATOR_NAME, ULTOSC_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
