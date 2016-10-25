import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class TRIMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static TRIMA_INDICATOR_NAME: string = "TRIMA";
    static TRIMA_INDICATOR_DESCR: string = "Triangular Moving Average";

    constructor() {
        super(TRIMA.TRIMA_INDICATOR_NAME, TRIMA.TRIMA_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
