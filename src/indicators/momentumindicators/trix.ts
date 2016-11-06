import * as indicators from "../";

export class TRIX
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "TRIX";
    static INDICATOR_DESCR: string = "1-day Rate-Of-Change (ROC) of a Triple Smooth EMA";

    constructor() {
        super(TRIX.INDICATOR_NAME, TRIX.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
