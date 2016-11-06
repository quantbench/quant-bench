import * as indicators from "../";

export class MACDEXT
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MACDEXT";
    static INDICATOR_DESCR: string = "MACD with controllable MA type";

    constructor() {
        super(MACDEXT.INDICATOR_NAME, MACDEXT.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
