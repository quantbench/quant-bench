import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class ULTOSC
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static ULTOSC_INDICATOR_NAME: string = "ULTOSC";
    static ULTOSC_INDICATOR_DESCR: string = "Ultimate Oscillator";

    constructor() {
        super(ULTOSC.ULTOSC_INDICATOR_NAME, ULTOSC.ULTOSC_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
