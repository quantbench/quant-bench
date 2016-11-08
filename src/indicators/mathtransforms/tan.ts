import * as indicators from "../";

export class TAN
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "TAN";
    static INDICATOR_DESCR: string = "Vector Trigonometric Tan";

    constructor() {
        super(TAN.INDICATOR_NAME, TAN.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.tan(inputData));
        return this.isReady;
    }
}
