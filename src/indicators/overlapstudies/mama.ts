import * as indicators from "../";

export class MAMA
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MAMA";
    static INDICATOR_DESCR: string = "MESA Adaptive Moving Average";

    constructor() {
        super(MAMA.INDICATOR_NAME, MAMA.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
