import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const SUM_INDICATOR_NAME: string = "SUM";
export const SUM_INDICATOR_DESCR: string = "Summation";

export class SUM
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(SUM_INDICATOR_NAME, SUM_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
