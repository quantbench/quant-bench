import * as indicators from "../";

export class Sqrt
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "SQRT";
    static INDICATOR_DESCR: string = "Vector Square Root";

    constructor() {
        super(Sqrt.INDICATOR_NAME, Sqrt.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.sqrt(inputData));
        return this.isReady;
    }
}
