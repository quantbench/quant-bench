import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const KAMA_INDICATOR_NAME: string = "KAMA";
export const KAMA_INDICATOR_DESCR: string = "Kaufman Adaptive Moving Average";

export class KAMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(KAMA_INDICATOR_NAME, KAMA_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
