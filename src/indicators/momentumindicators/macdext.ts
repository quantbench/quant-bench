import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MACDEXT_INDICATOR_NAME: string = "MACDEXT";
export const MACDEXT_INDICATOR_DESCR: string = "MACD with controllable MA type";

export class MACDEXT
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MACDEXT_INDICATOR_NAME, MACDEXT_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
