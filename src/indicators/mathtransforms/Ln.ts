import * as indicators from "../";

export class Ln
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "LN";
    static INDICATOR_DESCR: string = "Vector Log Natural";

    constructor() {
        super(Ln.INDICATOR_NAME, Ln.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.log(inputData));
        return this.isReady;
    }
}
