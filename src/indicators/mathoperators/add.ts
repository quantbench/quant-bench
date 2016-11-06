import * as indicators from "../";

export class ADD
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "ADD";
    static INDICATOR_DESCR: string = "Vector Arithmetic Add";

    constructor() {
        super(ADD.INDICATOR_NAME, ADD.INDICATOR_DESCR);
        this.setLookBack(0);
    }

    receiveData(inputData1: number, inputData2: number): boolean {
        this.setCurrentValue(inputData1 + inputData2);
        return this.isReady;
    }
}
