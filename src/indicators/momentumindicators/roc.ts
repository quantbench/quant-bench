import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class ROC
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static ROC_INDICATOR_NAME: string = "ROC";
    static ROC_INDICATOR_DESCR: string = "Rate of change : ((price/prevPrice)-1)*100";

    constructor() {
        super(ROC.ROC_INDICATOR_NAME, ROC.ROC_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
