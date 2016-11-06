import * as indicators from "../";

export class APO
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "APO";
    static INDICATOR_DESCR: string = "Absolute Price Oscillator";

    constructor() {
        super(APO.INDICATOR_NAME, APO.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
