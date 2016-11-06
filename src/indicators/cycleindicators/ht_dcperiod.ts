import * as indicators from "../";

export class HTDCPERIOD
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "HTDCPERIOD";
    static INDICATOR_DESCR: string = "Hilbert Transform - Dominant Cycle Period";

    constructor() {
        super(HTDCPERIOD.INDICATOR_NAME, HTDCPERIOD.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
