import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class ROCP
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static ROCP_INDICATOR_NAME: string = "ROCP";
    static ROCP_INDICATOR_DESCR: string = "Rate of change Percentage: (price-prevPrice)/prevPrice";

    constructor() {
        super(ROCP.ROCP_INDICATOR_NAME, ROCP.ROCP_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
