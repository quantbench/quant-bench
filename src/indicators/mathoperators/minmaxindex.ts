import * as indicators from "../";

export class MINMAXINDEX
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MINMAXINDEX";
    static INDICATOR_DESCR: string = "Indexes of lowest and highest values over a specified period";

    constructor() {
        super(MINMAXINDEX.INDICATOR_NAME, MINMAXINDEX.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
