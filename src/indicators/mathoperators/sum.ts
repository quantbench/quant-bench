import * as indicators from "../";

export class SUM
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "SUM";
    static INDICATOR_DESCR: string = "Summation";

    constructor() {
        super(SUM.INDICATOR_NAME, SUM.INDICATOR_DESCR);
    }

    receiveData(inputData1: number, inputData2: number): boolean {
        this.setCurrentValue(inputData1 + inputData2);
        return this.isReady;
    }
}
