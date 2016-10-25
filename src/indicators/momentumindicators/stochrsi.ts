import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class STOCHRSI
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static STOCHRSI_INDICATOR_NAME: string = "STOCHRSI";
    static STOCHRSI_INDICATOR_DESCR: string = "Stochastic Relative Strength Index";

    constructor() {
        super(STOCHRSI.STOCHRSI_INDICATOR_NAME, STOCHRSI.STOCHRSI_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
