import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const ROCR100_INDICATOR_NAME: string = "ROCR100";
export const ROCR100_INDICATOR_DESCR: string = "Rate of change ratio 100 scale: (price/prevPrice)*100";

export class ROCR100
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(ROCR100_INDICATOR_NAME, ROCR100_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
