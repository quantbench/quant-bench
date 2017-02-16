import * as indicators from "../";

export class Multiply
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "Multiply";
    static INDICATOR_DESCR: string = "Vector Arithmetic Mult";

    constructor() {
        super(Multiply.INDICATOR_NAME, Multiply.INDICATOR_DESCR);
    }

    receiveData(inputData1: number, inputData2: number): boolean {
        this.setCurrentValue(inputData1 * inputData2);
        return this.isReady;
    }
}
