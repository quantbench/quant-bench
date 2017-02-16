import * as indicators from "../";

export class Sinh
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "SINH";
    static INDICATOR_DESCR: string = "Vector Trigonometric Sinh";

    constructor() {
        super(Sinh.INDICATOR_NAME, Sinh.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.sinh(inputData));
        return this.isReady;
    }
}
