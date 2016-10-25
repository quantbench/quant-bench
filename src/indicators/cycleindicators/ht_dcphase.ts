import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class HTDCPHASE
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static HTDCPHASE_INDICATOR_NAME: string = "HTDCPHASE";
    static HTDCPHASE_INDICATOR_DESCR: string = "Hilbert Transform - Dominant Cycle Phase";

    constructor() {
        super(HTDCPHASE.HTDCPHASE_INDICATOR_NAME, HTDCPHASE.HTDCPHASE_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
