import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const ROC_INDICATOR_NAME: string = "ROC";
export const ROC_INDICATOR_DESCR: string = "Rate of change : ((price/prevPrice)-1)*100";

export class ROC
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(ROC_INDICATOR_NAME, ROC_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
