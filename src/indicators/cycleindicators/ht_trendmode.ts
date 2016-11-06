import * as indicators from "../";

export class HTTRENDMODE
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "HTTRENDMODE";
    static INDICATOR_DESCR: string = "Hilbert Transform - Trend vs Cycle Mode";

    constructor() {
        super(HTTRENDMODE.INDICATOR_NAME, HTTRENDMODE.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
