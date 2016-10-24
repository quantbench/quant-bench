import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const LINEARREGANGLE_INDICATOR_NAME: string = "LINEARREGANGLE";
export const LINEARREGANGLE_INDICATOR_DESCR: string = "Linear Regression Angle";

export class LINEARREGANGLE
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(LINEARREGANGLE_INDICATOR_NAME, LINEARREGANGLE_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
