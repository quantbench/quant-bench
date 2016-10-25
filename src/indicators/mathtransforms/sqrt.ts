import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class SQRT
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static SQRT_INDICATOR_NAME: string = "SQRT";
    static SQRT_INDICATOR_DESCR: string = "Vector Square Root";

    constructor() {
        super(SQRT.SQRT_INDICATOR_NAME, SQRT.SQRT_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
