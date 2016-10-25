import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MIDPOINT
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MIDPOINT_INDICATOR_NAME: string = "MIDPOINT";
    static MIDPOINT_INDICATOR_DESCR: string = "MidPoint over period";

    constructor() {
        super(MIDPOINT.MIDPOINT_INDICATOR_NAME, MIDPOINT.MIDPOINT_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
