import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class KAMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static KAMA_INDICATOR_NAME: string = "KAMA";
    static KAMA_INDICATOR_DESCR: string = "Kaufman Adaptive Moving Average";

    constructor() {
        super(KAMA.KAMA_INDICATOR_NAME, KAMA.KAMA_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
