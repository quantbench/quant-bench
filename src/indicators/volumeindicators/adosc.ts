import * as indicators from "../";
import * as marketData from "../../data/market/";

export class ADOSC
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "ADOSC";
    static INDICATOR_DESCR: string = "Chaikin A/D Oscillator";

    constructor() {
        super(ADOSC.INDICATOR_NAME, ADOSC.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
