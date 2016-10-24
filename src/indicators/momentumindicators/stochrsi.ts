import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const STOCHRSI_INDICATOR_NAME: string = "STOCHRSI";
export const STOCHRSI_INDICATOR_DESCR: string = "Stochastic Relative Strength Index";

export class STOCHRSI
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(STOCHRSI_INDICATOR_NAME, STOCHRSI_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
