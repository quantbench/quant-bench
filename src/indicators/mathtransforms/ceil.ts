import * as indicators from "../";

export class CEIL
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "CEIL";
    static INDICATOR_DESCR: string = "Vector Ceil";

    constructor() {
        super(CEIL.INDICATOR_NAME, CEIL.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.ceil(inputData));
        return this.isReady;
    }
}
