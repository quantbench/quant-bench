import * as indicators from "../";

export class MULT
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MULT";
    static INDICATOR_DESCR: string = "Vector Arithmetic Mult";

    constructor() {
        super(MULT.INDICATOR_NAME, MULT.INDICATOR_DESCR);
    }

    receiveData(inputData1: number, inputData2: number): boolean {
        this.setCurrentValue(inputData1 * inputData2);
        return this.isReady;
    }
}
