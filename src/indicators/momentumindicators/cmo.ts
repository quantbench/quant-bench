import * as indicators from "../";

export class CMO
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "CMO";
    static INDICATOR_DESCR: string = "Chande Momentum Oscillator";

    constructor() {
        super(CMO.INDICATOR_NAME, CMO.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
