import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class HTDCPERIOD
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static HTDCPERIOD_INDICATOR_NAME: string = "HTDCPERIOD";
    static HTDCPERIOD_INDICATOR_DESCR: string = "Hilbert Transform - Dominant Cycle Period";

    constructor() {
        super(HTDCPERIOD.HTDCPERIOD_INDICATOR_NAME, HTDCPERIOD.HTDCPERIOD_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
