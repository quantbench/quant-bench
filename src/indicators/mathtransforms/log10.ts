import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class LOG10
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static LOG10_INDICATOR_NAME: string = "LOG10";
    static LOG10_INDICATOR_DESCR: string = "Vector Log10";

    constructor() {
        super(LOG10.LOG10_INDICATOR_NAME, LOG10.LOG10_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
