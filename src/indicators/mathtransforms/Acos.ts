import * as indicators from "../";

export class Acos
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "ACOS";
    static INDICATOR_DESCR: string = "Vector Trigonometric Acos";

    constructor() {
        super(Acos.INDICATOR_NAME, Acos.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.acos(inputData));
        return this.isReady;
    }
}
