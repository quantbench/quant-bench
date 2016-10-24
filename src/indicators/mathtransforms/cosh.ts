import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const COSH_INDICATOR_NAME: string = "COSH";
export const COSH_INDICATOR_DESCR: string = "Vector Trigonometric Cosh";

export class COSH
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(COSH_INDICATOR_NAME, COSH_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
