import * as indicators from "../";

export class Ceil
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "CEIL";
    static INDICATOR_DESCR: string = "Vector Ceil";

    constructor() {
        super(Ceil.INDICATOR_NAME, Ceil.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.ceil(inputData));
        return this.isReady;
    }
}
