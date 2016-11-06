import * as indicators from "../";

export class CORREL
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "CORREL";
    static INDICATOR_DESCR: string = "Pearson's Correlation Coefficient (r)";

    constructor() {
        super(CORREL.INDICATOR_NAME, CORREL.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
