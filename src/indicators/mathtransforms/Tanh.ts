import * as indicators from "../";

export class Tanh
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "TANH";
    static INDICATOR_DESCR: string = "Vector Trigonometric Tanh";

    constructor() {
        super(Tanh.INDICATOR_NAME, Tanh.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.tanh(inputData));
        return this.isReady;
    }
}
