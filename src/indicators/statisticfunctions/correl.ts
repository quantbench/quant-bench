import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const CORREL_INDICATOR_NAME: string = "CORREL";
export const CORREL_INDICATOR_DESCR: string = "Pearson's Correlation Coefficient (r)";

export class CORREL
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(CORREL_INDICATOR_NAME, CORREL_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
