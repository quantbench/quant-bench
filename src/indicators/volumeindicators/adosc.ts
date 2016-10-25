import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class ADOSC
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static ADOSC_INDICATOR_NAME: string = "ADOSC";
    static ADOSC_INDICATOR_DESCR: string = "Chaikin A/D Oscillator";

    constructor() {
        super(ADOSC.ADOSC_INDICATOR_NAME, ADOSC.ADOSC_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
