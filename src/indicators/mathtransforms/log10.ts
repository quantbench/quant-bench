import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const LOG10_INDICATOR_NAME: string = "LOG10";
export const LOG10_INDICATOR_DESCR: string = "Vector Log10";

export class LOG10
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(LOG10_INDICATOR_NAME, LOG10_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
