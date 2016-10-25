import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class ROCR
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static ROCR_INDICATOR_NAME: string = "ROCR";
    static ROCR_INDICATOR_DESCR: string = "Rate of change ratio: (price/prevPrice)";

    constructor() {
        super(ROCR.ROCR_INDICATOR_NAME, ROCR.ROCR_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
