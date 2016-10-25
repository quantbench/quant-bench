import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class HTTRENDLINE
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static HTTRENDLINE_INDICATOR_NAME: string = "HTTRENDLINE";
    static HTTRENDLINE_INDICATOR_DESCR: string = "Hilbert Transform - Instantaneous Trendline";

    constructor() {
        super(HTTRENDLINE.HTTRENDLINE_INDICATOR_NAME, HTTRENDLINE.HTTRENDLINE_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
