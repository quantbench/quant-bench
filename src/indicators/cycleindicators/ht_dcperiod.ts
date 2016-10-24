import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const HTDCPERIOD_INDICATOR_NAME: string = "HTDCPERIOD";
export const HTDCPERIOD_INDICATOR_DESCR: string = "Hilbert Transform - Dominant Cycle Period";

export class HTDCPERIOD
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(HTDCPERIOD_INDICATOR_NAME, HTDCPERIOD_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
