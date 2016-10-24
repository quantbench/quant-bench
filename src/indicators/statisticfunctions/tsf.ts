import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const TSF_INDICATOR_NAME: string = "TSF";
export const TSF_INDICATOR_DESCR: string = "Time Series Forecast";

export class TSF
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(TSF_INDICATOR_NAME, TSF_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
