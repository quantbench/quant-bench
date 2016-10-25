import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class LINEARREGANGLE
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static LINEARREGANGLE_INDICATOR_NAME: string = "LINEARREGANGLE";
    static LINEARREGANGLE_INDICATOR_DESCR: string = "Linear Regression Angle";

    constructor() {
        super(LINEARREGANGLE.LINEARREGANGLE_INDICATOR_NAME, LINEARREGANGLE.LINEARREGANGLE_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
