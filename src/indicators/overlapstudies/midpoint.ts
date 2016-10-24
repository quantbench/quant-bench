import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MIDPOINT_INDICATOR_NAME: string = "MIDPOINT";
export const MIDPOINT_INDICATOR_DESCR: string = "MidPoint over period";

export class MIDPOINT
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MIDPOINT_INDICATOR_NAME, MIDPOINT_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
