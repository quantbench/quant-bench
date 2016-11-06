import * as indicators from "../";

export class STOCHRSI
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "STOCHRSI";
    static INDICATOR_DESCR: string = "Stochastic Relative Strength Index";

    constructor() {
        super(STOCHRSI.INDICATOR_NAME, STOCHRSI.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
