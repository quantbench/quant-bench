import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class TRIX
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static TRIX_INDICATOR_NAME: string = "TRIX";
    static TRIX_INDICATOR_DESCR: string = "1-day Rate-Of-Change (ROC) of a Triple Smooth EMA";

    constructor() {
        super(TRIX.TRIX_INDICATOR_NAME, TRIX.TRIX_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
