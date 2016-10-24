import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MAVP_INDICATOR_NAME: string = "MAVP";
export const MAVP_INDICATOR_DESCR: string = "Moving average with variable period";

export class MAVP
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MAVP_INDICATOR_NAME, MAVP_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
