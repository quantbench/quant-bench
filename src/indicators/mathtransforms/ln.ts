import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const LN_INDICATOR_NAME: string = "LN";
export const LN_INDICATOR_DESCR: string = "Vector Log Natural";

export class LN
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(LN_INDICATOR_NAME, LN_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
