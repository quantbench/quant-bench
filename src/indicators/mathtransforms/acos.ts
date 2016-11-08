import * as indicators from "../";

export class ACOS
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "ACOS";
    static INDICATOR_DESCR: string = "Vector Trigonometric ACos";

    constructor() {
        super(ACOS.INDICATOR_NAME, ACOS.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.acos(inputData));
        return this.isReady;
    }
}
