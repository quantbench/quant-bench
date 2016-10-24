import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const ASIN_INDICATOR_NAME: string = "ASIN";
export const ASIN_INDICATOR_DESCR: string = "Vector Trigonometric ASin";

export class ASIN
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(ASIN_INDICATOR_NAME, ASIN_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
