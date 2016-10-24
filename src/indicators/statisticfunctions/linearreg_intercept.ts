import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const LINEARREGINTERCEPT_INDICATOR_NAME: string = "LINEARREGINTERCEPT";
export const LINEARREGINTERCEPT_INDICATOR_DESCR: string = "Linear Regression Intercept";

export class LINEARREGINTERCEPT
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(LINEARREGINTERCEPT_INDICATOR_NAME, LINEARREGINTERCEPT_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
