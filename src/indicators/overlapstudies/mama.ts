import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MAMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MAMA_INDICATOR_NAME: string = "MAMA";
    static MAMA_INDICATOR_DESCR: string = "MESA Adaptive Moving Average";

    constructor() {
        super(MAMA.MAMA_INDICATOR_NAME, MAMA.MAMA_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
