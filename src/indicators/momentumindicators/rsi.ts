import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const RSI_INDICATOR_NAME: string = "RSI";
export const RSI_INDICATOR_DESCR: string = "Relative Strength Index";

export class RSI
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(RSI_INDICATOR_NAME, RSI_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
