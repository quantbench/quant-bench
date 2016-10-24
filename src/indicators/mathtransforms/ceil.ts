import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const CEIL_INDICATOR_NAME: string = "CEIL";
export const CEIL_INDICATOR_DESCR: string = "Vector Ceil";

export class CEIL
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(CEIL_INDICATOR_NAME, CEIL_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
