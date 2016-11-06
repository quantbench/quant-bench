import * as indicators from "../";

export class LN
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "LN";
    static INDICATOR_DESCR: string = "Vector Log Natural";

    constructor() {
        super(LN.INDICATOR_NAME, LN.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
