import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class ROCR100
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static ROCR100_INDICATOR_NAME: string = "ROCR100";
    static ROCR100_INDICATOR_DESCR: string = "Rate of change ratio 100 scale: (price/prevPrice)*100";

    constructor() {
        super(ROCR100.ROCR100_INDICATOR_NAME, ROCR100.ROCR100_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
