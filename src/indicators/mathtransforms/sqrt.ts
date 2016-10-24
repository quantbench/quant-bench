import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const SQRT_INDICATOR_NAME: string = "SQRT";
export const SQRT_INDICATOR_DESCR: string = "Vector Square Root";

export class SQRT
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(SQRT_INDICATOR_NAME, SQRT_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
