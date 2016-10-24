import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const LINEARREGSLOPE_INDICATOR_NAME: string = "LINEARREGSLOPE";
export const LINEARREGSLOPE_INDICATOR_DESCR: string = "Linear Regression Slope";

export class LINEARREGSLOPE
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(LINEARREGSLOPE_INDICATOR_NAME, LINEARREGSLOPE_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
