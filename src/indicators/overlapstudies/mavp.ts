import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MAVP
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MAVP_INDICATOR_NAME: string = "MAVP";
    static MAVP_INDICATOR_DESCR: string = "Moving average with variable period";

    constructor() {
        super(MAVP.MAVP_INDICATOR_NAME, MAVP.MAVP_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
