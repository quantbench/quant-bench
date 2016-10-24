import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const ROCP_INDICATOR_NAME: string = "ROCP";
export const ROCP_INDICATOR_DESCR: string = "Rate of change Percentage: (price-prevPrice)/prevPrice";

export class ROCP
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(ROCP_INDICATOR_NAME, ROCP_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
