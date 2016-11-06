import * as indicators from "../";

export class BETA
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "BETA";
    static INDICATOR_DESCR: string = "Beta";

    constructor() {
        super(BETA.INDICATOR_NAME, BETA.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
