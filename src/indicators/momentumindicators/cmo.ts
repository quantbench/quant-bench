import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class CMO
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static CMO_INDICATOR_NAME: string = "CMO";
    static CMO_INDICATOR_DESCR: string = "Chande Momentum Oscillator";

    constructor() {
        super(CMO.CMO_INDICATOR_NAME, CMO.CMO_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
