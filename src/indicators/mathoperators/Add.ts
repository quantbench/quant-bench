import * as indicators from "../";

export class Add
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "Add";
    static INDICATOR_DESCR: string = "Vector Arithmetic Add";

    constructor() {
        super(Add.INDICATOR_NAME, Add.INDICATOR_DESCR);
        this.setLookBack(0);
    }

    receiveData(inputData1: number, inputData2: number): boolean {
        this.setCurrentValue(inputData1 + inputData2);
        return this.isReady;
    }
}
