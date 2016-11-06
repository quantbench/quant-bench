import * as indicators from "../";
import * as marketData from "../../data/market/";

export class ULTOSC
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "ULTOSC";
    static INDICATOR_DESCR: string = "Ultimate Oscillator";

    constructor() {
        super(ULTOSC.INDICATOR_NAME, ULTOSC.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
