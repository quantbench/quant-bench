import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class LINEARREG
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static LINEARREG_INDICATOR_NAME: string = "LINEARREG";
    static LINEARREG_INDICATOR_DESCR: string = "Linear Regression";

    constructor() {
        super(LINEARREG.LINEARREG_INDICATOR_NAME, LINEARREG.LINEARREG_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
