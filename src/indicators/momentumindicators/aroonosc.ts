import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class AROONOSC
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static AROONOSC_INDICATOR_NAME: string = "AROONOSC";
    static AROONOSC_INDICATOR_DESCR: string = "Aroon Oscillator";

    constructor() {
        super(AROONOSC.AROONOSC_INDICATOR_NAME, AROONOSC.AROONOSC_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
