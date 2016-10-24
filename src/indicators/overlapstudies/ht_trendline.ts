import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const HTTRENDLINE_INDICATOR_NAME: string = "HTTRENDLINE";
export const HTTRENDLINE_INDICATOR_DESCR: string = "Hilbert Transform - Instantaneous Trendline";

export class HTTRENDLINE
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(HTTRENDLINE_INDICATOR_NAME, HTTRENDLINE_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
