import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MA_INDICATOR_NAME: string = "MA";
export const MA_INDICATOR_DESCR: string = "Moving average";

export class MA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MA_INDICATOR_NAME, MA_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
