import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MA_INDICATOR_NAME: string = "MA";
    static MA_INDICATOR_DESCR: string = "Moving average";

    constructor() {
        super(MA.MA_INDICATOR_NAME, MA.MA_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
