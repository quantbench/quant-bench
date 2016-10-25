import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MACD
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MACD_INDICATOR_NAME: string = "MACD";
    static MACD_INDICATOR_DESCR: string = "Moving Average Convergence/Divergence";

    constructor() {
        super(MACD.MACD_INDICATOR_NAME, MACD.MACD_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
