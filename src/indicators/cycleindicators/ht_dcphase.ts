import * as indicators from "../";

export class HTDCPHASE
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "HTDCPHASE";
    static INDICATOR_DESCR: string = "Hilbert Transform - Dominant Cycle Phase";

    constructor() {
        super(HTDCPHASE.INDICATOR_NAME, HTDCPHASE.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
