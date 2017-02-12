import * as indicators from "../";

export class Subtract
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "Subtract";
    static INDICATOR_DESCR: string = "Vector Arithmetic Substraction";

    constructor() {
        super(Subtract.INDICATOR_NAME, Subtract.INDICATOR_DESCR);
    }

    receiveData(inputData1: number, inputData2: number): boolean {
        this.setCurrentValue(inputData1 - inputData2);
        return this.isReady;
    }
}
