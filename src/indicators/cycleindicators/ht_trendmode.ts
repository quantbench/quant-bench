import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const HTTRENDMODE_INDICATOR_NAME: string = "HTTRENDMODE";
export const HTTRENDMODE_INDICATOR_DESCR: string = "Hilbert Transform - Trend vs Cycle Mode";

export class HTTRENDMODE
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(HTTRENDMODE_INDICATOR_NAME, HTTRENDMODE_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
