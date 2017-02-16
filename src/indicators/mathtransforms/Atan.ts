import * as indicators from "../";

export class Atan
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "ATAN";
    static INDICATOR_DESCR: string = "Vector Trigonometric Atan";

    constructor() {
        super(Atan.INDICATOR_NAME, Atan.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.atan(inputData));
        return this.isReady;
    }
}
