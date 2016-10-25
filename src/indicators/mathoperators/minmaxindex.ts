import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MINMAXINDEX
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MINMAXINDEX_INDICATOR_NAME: string = "MINMAXINDEX";
    static MINMAXINDEX_INDICATOR_DESCR: string = "Indexes of lowest and highest values over a specified period";

    constructor() {
        super(MINMAXINDEX.MINMAXINDEX_INDICATOR_NAME, MINMAXINDEX.MINMAXINDEX_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
