import * as indicators from "../";

export class ASIN
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "ASIN";
    static INDICATOR_DESCR: string = "Vector Trigonometric ASin";

    constructor() {
        super(ASIN.INDICATOR_NAME, ASIN.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.asin(inputData));
        return this.isReady;
    }
}
