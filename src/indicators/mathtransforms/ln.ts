import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class LN
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static LN_INDICATOR_NAME: string = "LN";
    static LN_INDICATOR_DESCR: string = "Vector Log Natural";

    constructor() {
        super(LN.LN_INDICATOR_NAME, LN.LN_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
