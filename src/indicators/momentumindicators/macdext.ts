import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MACDEXT
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MACDEXT_INDICATOR_NAME: string = "MACDEXT";
    static MACDEXT_INDICATOR_DESCR: string = "MACD with controllable MA type";

    constructor() {
        super(MACDEXT.MACDEXT_INDICATOR_NAME, MACDEXT.MACDEXT_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
