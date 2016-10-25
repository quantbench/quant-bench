import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class TSF
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static TSF_INDICATOR_NAME: string = "TSF";
    static TSF_INDICATOR_DESCR: string = "Time Series Forecast";

    constructor() {
        super(TSF.TSF_INDICATOR_NAME, TSF.TSF_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
