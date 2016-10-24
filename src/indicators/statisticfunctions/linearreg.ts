import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const LINEARREG_INDICATOR_NAME: string = "LINEARREG";
export const LINEARREG_INDICATOR_DESCR: string = "Linear Regression";

export class LINEARREG
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(LINEARREG_INDICATOR_NAME, LINEARREG_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
