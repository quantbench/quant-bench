import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MAXINDEX_INDICATOR_NAME: string = "MAXINDEX";
export const MAXINDEX_INDICATOR_DESCR: string = "Index of highest value over a specified period";

export class MAXINDEX
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MAXINDEX_INDICATOR_NAME, MAXINDEX_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
