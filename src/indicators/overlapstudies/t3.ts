import * as indicators from "../";

export class T3
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "T3";
    static INDICATOR_DESCR: string = "Triple Exponential Moving Average (T3)";

    constructor() {
        super(T3.INDICATOR_NAME, T3.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
