import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const T3_INDICATOR_NAME: string = "T3";
export const T3_INDICATOR_DESCR: string = "Triple Exponential Moving Average (T3)";

export class T3
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(T3_INDICATOR_NAME, T3_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
