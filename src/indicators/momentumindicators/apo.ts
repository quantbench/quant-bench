import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class APO
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static APO_INDICATOR_NAME: string = "APO";
    static APO_INDICATOR_DESCR: string = "Absolute Price Oscillator";

    constructor() {
        super(APO.APO_INDICATOR_NAME, APO.APO_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
