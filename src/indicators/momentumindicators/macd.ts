import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MACD_INDICATOR_NAME: string = "MACD";
export const MACD_INDICATOR_DESCR: string = "Moving Average Convergence/Divergence";

export class MACD
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MACD_INDICATOR_NAME, MACD_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
