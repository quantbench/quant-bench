import * as indicators from "../";

export class SUB
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "SUB";
    static INDICATOR_DESCR: string = "Vector Arithmetic Substraction";

    constructor() {
        super(SUB.INDICATOR_NAME, SUB.INDICATOR_DESCR);
    }

    receiveData(inputData1: number, inputData2: number): boolean {
        this.setCurrentValue(inputData1 - inputData2);
        return this.isReady;
    }
}
