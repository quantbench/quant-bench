import * as indicators from "../";

export class LOG10
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "LOG10";
    static INDICATOR_DESCR: string = "Vector Log10";

    constructor() {
        super(LOG10.INDICATOR_NAME, LOG10.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.log10(inputData));
        return this.isReady;
    }
}
