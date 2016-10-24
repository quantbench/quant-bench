import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MINMAXINDEX_INDICATOR_NAME: string = "MINMAXINDEX";
export const MINMAXINDEX_INDICATOR_DESCR: string = "Indexes of lowest and highest values over a specified period";

export class MINMAXINDEX
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MINMAXINDEX_INDICATOR_NAME, MINMAXINDEX_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
