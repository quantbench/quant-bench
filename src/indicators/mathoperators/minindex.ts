import * as indicators from "../";

export class MININDEX
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MININDEX";
    static INDICATOR_DESCR: string = "Index of lowest value over a specified period";

    constructor() {
        super(MININDEX.INDICATOR_NAME, MININDEX.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
