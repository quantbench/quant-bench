import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MINMAX
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MINMAX_INDICATOR_NAME: string = "MINMAX";
    static MINMAX_INDICATOR_DESCR: string = "Lowest and highest values over a specified period";

    constructor() {
        super(MINMAX.MINMAX_INDICATOR_NAME, MINMAX.MINMAX_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
