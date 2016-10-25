import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class RSI
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static RSI_INDICATOR_NAME: string = "RSI";
    static RSI_INDICATOR_DESCR: string = "Relative Strength Index";

    constructor() {
        super(RSI.RSI_INDICATOR_NAME, RSI.RSI_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
