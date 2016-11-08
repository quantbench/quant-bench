import * as indicators from "../";

export class SQRT
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "SQRT";
    static INDICATOR_DESCR: string = "Vector Square Root";

    constructor() {
        super(SQRT.INDICATOR_NAME, SQRT.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.sqrt(inputData));
        return this.isReady;
    }
}
