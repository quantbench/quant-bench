import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class WMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static WMA_INDICATOR_NAME: string = "WMA";
    static WMA_INDICATOR_DESCR: string = "Weighted Moving Average";

    constructor() {
        super(WMA.WMA_INDICATOR_NAME, WMA.WMA_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
