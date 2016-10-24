import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const TRIX_INDICATOR_NAME: string = "TRIX";
export const TRIX_INDICATOR_DESCR: string = "1-day Rate-Of-Change (ROC) of a Triple Smooth EMA";

export class TRIX
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(TRIX_INDICATOR_NAME, TRIX_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
