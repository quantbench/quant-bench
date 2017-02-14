import * as indicators from "../";

export class Asin
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "ASIN";
    static INDICATOR_DESCR: string = "Vector Trigonometric Asin";

    constructor() {
        super(Asin.INDICATOR_NAME, Asin.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.asin(inputData));
        return this.isReady;
    }
}
