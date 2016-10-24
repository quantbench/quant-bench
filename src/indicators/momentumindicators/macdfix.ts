import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MACDFIX_INDICATOR_NAME: string = "MACDFIX";
export const MACDFIX_INDICATOR_DESCR: string = "Moving Average Convergence/Divergence Fix 12/26";

export class MACDFIX
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MACDFIX_INDICATOR_NAME, MACDFIX_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
