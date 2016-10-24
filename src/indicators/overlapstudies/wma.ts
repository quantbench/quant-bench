import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const WMA_INDICATOR_NAME: string = "WMA";
export const WMA_INDICATOR_DESCR: string = "Weighted Moving Average";

export class WMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(WMA_INDICATOR_NAME, WMA_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
