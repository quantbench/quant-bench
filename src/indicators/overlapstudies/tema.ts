import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const TEMA_INDICATOR_NAME: string = "TEMA";
export const TEMA_INDICATOR_DESCR: string = "Triple Exponential Moving Average";

export class TEMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(TEMA_INDICATOR_NAME, TEMA_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
