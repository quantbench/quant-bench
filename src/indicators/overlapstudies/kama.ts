import * as indicators from "../";

export class KAMA
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "KAMA";
    static INDICATOR_DESCR: string = "Kaufman Adaptive Moving Average";

    constructor() {
        super(KAMA.INDICATOR_NAME, KAMA.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
