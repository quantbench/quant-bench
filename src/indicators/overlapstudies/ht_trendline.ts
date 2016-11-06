import * as indicators from "../";

export class HTTRENDLINE
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "HTTRENDLINE";
    static INDICATOR_DESCR: string = "Hilbert Transform - Instantaneous Trendline";

    constructor() {
        super(HTTRENDLINE.INDICATOR_NAME, HTTRENDLINE.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
