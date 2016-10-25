import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class CORREL
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static CORREL_INDICATOR_NAME: string = "CORREL";
    static CORREL_INDICATOR_DESCR: string = "Pearson's Correlation Coefficient (r)";

    constructor() {
        super(CORREL.CORREL_INDICATOR_NAME, CORREL.CORREL_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
