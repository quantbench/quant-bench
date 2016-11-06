import * as indicators from "../";

export class MAXINDEX
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MAXINDEX";
    static INDICATOR_DESCR: string = "Index of highest value over a specified period";

    constructor() {
        super(MAXINDEX.INDICATOR_NAME, MAXINDEX.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
