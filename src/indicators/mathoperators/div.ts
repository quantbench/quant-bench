import * as indicators from "../";

export class DIV
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "DIV";
    static INDICATOR_DESCR: string = "Vector Arithmetic Div";

    constructor() {
        super(DIV.INDICATOR_NAME, DIV.INDICATOR_DESCR);
    }

    receiveData(inputData1: number, inputData2: number): boolean {
        this.setCurrentValue(inputData1 / inputData2);
        return this.isReady;
    }
}
