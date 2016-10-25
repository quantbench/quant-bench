import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class LINEARREGSLOPE
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static LINEARREGSLOPE_INDICATOR_NAME: string = "LINEARREGSLOPE";
    static LINEARREGSLOPE_INDICATOR_DESCR: string = "Linear Regression Slope";

    constructor() {
        super(LINEARREGSLOPE.LINEARREGSLOPE_INDICATOR_NAME, LINEARREGSLOPE.LINEARREGSLOPE_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
