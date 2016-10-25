import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class ASIN
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static ASIN_INDICATOR_NAME: string = "ASIN";
    static ASIN_INDICATOR_DESCR: string = "Vector Trigonometric ASin";

    constructor() {
        super(ASIN.ASIN_INDICATOR_NAME, ASIN.ASIN_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
