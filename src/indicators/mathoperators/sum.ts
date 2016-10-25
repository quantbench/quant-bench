import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class SUM
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static SUM_INDICATOR_NAME: string = "SUM";
    static SUM_INDICATOR_DESCR: string = "Summation";

    constructor() {
        super(SUM.SUM_INDICATOR_NAME, SUM.SUM_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
