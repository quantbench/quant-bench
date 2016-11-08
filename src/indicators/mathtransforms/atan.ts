import * as indicators from "../";

export class ATAN
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "ATAN";
    static INDICATOR_DESCR: string = "Vector Trigonometric ATan";

    constructor() {
        super(ATAN.INDICATOR_NAME, ATAN.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.atan(inputData));
        return this.isReady;
    }
}
