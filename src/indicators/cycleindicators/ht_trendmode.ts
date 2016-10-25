import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class HTTRENDMODE
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static HTTRENDMODE_INDICATOR_NAME: string = "HTTRENDMODE";
    static HTTRENDMODE_INDICATOR_DESCR: string = "Hilbert Transform - Trend vs Cycle Mode";

    constructor() {
        super(HTTRENDMODE.HTTRENDMODE_INDICATOR_NAME, HTTRENDMODE.HTTRENDMODE_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
