import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class COSH
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static COSH_INDICATOR_NAME: string = "COSH";
    static COSH_INDICATOR_DESCR: string = "Vector Trigonometric Cosh";

    constructor() {
        super(COSH.COSH_INDICATOR_NAME, COSH.COSH_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
