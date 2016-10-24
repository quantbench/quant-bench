import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const OBV_INDICATOR_NAME: string = "OBV";
export const OBV_INDICATOR_DESCR: string = "On Balance Volume";

export class OBV
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(OBV_INDICATOR_NAME, OBV_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
