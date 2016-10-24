import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MAMA_INDICATOR_NAME: string = "MAMA";
export const MAMA_INDICATOR_DESCR: string = "MESA Adaptive Moving Average";

export class MAMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MAMA_INDICATOR_NAME, MAMA_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
