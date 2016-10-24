import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const AROONOSC_INDICATOR_NAME: string = "AROONOSC";
export const AROONOSC_INDICATOR_DESCR: string = "Aroon Oscillator";

export class AROONOSC
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(AROONOSC_INDICATOR_NAME, AROONOSC_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
