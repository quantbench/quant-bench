import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const CMO_INDICATOR_NAME: string = "CMO";
export const CMO_INDICATOR_DESCR: string = "Chande Momentum Oscillator";

export class CMO
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(CMO_INDICATOR_NAME, CMO_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
