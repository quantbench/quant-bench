import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const APO_INDICATOR_NAME: string = "APO";
export const APO_INDICATOR_DESCR: string = "Absolute Price Oscillator";

export class APO
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(APO_INDICATOR_NAME, APO_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
