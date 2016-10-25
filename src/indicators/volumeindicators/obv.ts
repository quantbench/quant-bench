import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class OBV
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static OBV_INDICATOR_NAME: string = "OBV";
    static OBV_INDICATOR_DESCR: string = "On Balance Volume";

    constructor() {
        super(OBV.OBV_INDICATOR_NAME, OBV.OBV_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
