import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const ADOSC_INDICATOR_NAME: string = "ADOSC";
export const ADOSC_INDICATOR_DESCR: string = "Chaikin A/D Oscillator";

export class ADOSC
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(ADOSC_INDICATOR_NAME, ADOSC_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
