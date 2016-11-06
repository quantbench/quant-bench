import * as indicators from "../";

export class HTPHASOR
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "HTPHASOR";
    static INDICATOR_DESCR: string = "Hilbert Transform - Phasor Components";

    constructor() {
        super(HTPHASOR.INDICATOR_NAME, HTPHASOR.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
