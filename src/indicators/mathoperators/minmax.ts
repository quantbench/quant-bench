import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MINMAX_INDICATOR_NAME: string = "MINMAX";
export const MINMAX_INDICATOR_DESCR: string = "Lowest and highest values over a specified period";

export class MINMAX
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MINMAX_INDICATOR_NAME, MINMAX_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
