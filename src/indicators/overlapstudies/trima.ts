import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const TRIMA_INDICATOR_NAME: string = "TRIMA";
export const TRIMA_INDICATOR_DESCR: string = "Triangular Moving Average";

export class TRIMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(TRIMA_INDICATOR_NAME, TRIMA_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
