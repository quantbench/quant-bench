import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class CEIL
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static CEIL_INDICATOR_NAME: string = "CEIL";
    static CEIL_INDICATOR_DESCR: string = "Vector Ceil";

    constructor() {
        super(CEIL.CEIL_INDICATOR_NAME, CEIL.CEIL_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
