import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MAXINDEX
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MAXINDEX_INDICATOR_NAME: string = "MAXINDEX";
    static MAXINDEX_INDICATOR_DESCR: string = "Index of highest value over a specified period";

    constructor() {
        super(MAXINDEX.MAXINDEX_INDICATOR_NAME, MAXINDEX.MAXINDEX_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
