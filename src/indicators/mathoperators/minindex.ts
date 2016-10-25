import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MININDEX
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MININDEX_INDICATOR_NAME: string = "MININDEX";
    static MININDEX_INDICATOR_DESCR: string = "Index of lowest value over a specified period";

    constructor() {
        super(MININDEX.MININDEX_INDICATOR_NAME, MININDEX.MININDEX_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
