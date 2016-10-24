import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MININDEX_INDICATOR_NAME: string = "MININDEX";
export const MININDEX_INDICATOR_DESCR: string = "Index of lowest value over a specified period";

export class MININDEX
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MININDEX_INDICATOR_NAME, MININDEX_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
