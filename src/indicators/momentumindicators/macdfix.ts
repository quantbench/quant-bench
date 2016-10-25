import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MACDFIX
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MACDFIX_INDICATOR_NAME: string = "MACDFIX";
    static MACDFIX_INDICATOR_DESCR: string = "Moving Average Convergence/Divergence Fix 12/26";

    constructor() {
        super(MACDFIX.MACDFIX_INDICATOR_NAME, MACDFIX.MACDFIX_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
