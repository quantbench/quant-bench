import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class T3
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static T3_INDICATOR_NAME: string = "T3";
    static T3_INDICATOR_DESCR: string = "Triple Exponential Moving Average (T3)";

    constructor() {
        super(T3.T3_INDICATOR_NAME, T3.T3_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
