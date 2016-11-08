import * as indicators from "../";

export class SINH
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "SINH";
    static INDICATOR_DESCR: string = "Vector Trigonometric Sinh";

    constructor() {
        super(SINH.INDICATOR_NAME, SINH.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.sinh(inputData));
        return this.isReady;
    }
}
