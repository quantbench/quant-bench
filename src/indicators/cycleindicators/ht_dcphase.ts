import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const HTDCPHASE_INDICATOR_NAME: string = "HTDCPHASE";
export const HTDCPHASE_INDICATOR_DESCR: string = "Hilbert Transform - Dominant Cycle Phase";

export class HTDCPHASE
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(HTDCPHASE_INDICATOR_NAME, HTDCPHASE_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
