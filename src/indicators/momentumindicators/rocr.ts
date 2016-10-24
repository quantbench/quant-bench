import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const ROCR_INDICATOR_NAME: string = "ROCR";
export const ROCR_INDICATOR_DESCR: string = "Rate of change ratio: (price/prevPrice)";

export class ROCR
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(ROCR_INDICATOR_NAME, ROCR_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
