import * as indicators from "../";

export class TANH
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "TANH";
    static INDICATOR_DESCR: string = "Vector Trigonometric Tanh";

    constructor() {
        super(TANH.INDICATOR_NAME, TANH.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.tanh(inputData));
        return this.isReady;
    }
}
