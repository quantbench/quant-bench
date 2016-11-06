import * as indicators from "../";

export class MACDFIX
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MACDFIX";
    static INDICATOR_DESCR: string = "Moving Average Convergence/Divergence Fix 12/26";

    constructor() {
        super(MACDFIX.INDICATOR_NAME, MACDFIX.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
