import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MIN_INDICATOR_NAME: string = "MIN";
export const MIN_INDICATOR_DESCR: string = "Lowest value over a specified period";

export class MIN
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MIN_INDICATOR_NAME, MIN_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
