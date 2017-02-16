import * as indicators from "../";

export class Cos
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "COS";
    static INDICATOR_DESCR: string = "Vector Trigonometric Cos";

    constructor() {
        super(Cos.INDICATOR_NAME, Cos.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.cos(inputData));
        return this.isReady;
    }
}
