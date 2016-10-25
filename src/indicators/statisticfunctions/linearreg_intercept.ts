import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class LINEARREGINTERCEPT
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static LINEARREGINTERCEPT_INDICATOR_NAME: string = "LINEARREGINTERCEPT";
    static LINEARREGINTERCEPT_INDICATOR_DESCR: string = "Linear Regression Intercept";

    constructor() {
        super(LINEARREGINTERCEPT.LINEARREGINTERCEPT_INDICATOR_NAME, LINEARREGINTERCEPT.LINEARREGINTERCEPT_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
