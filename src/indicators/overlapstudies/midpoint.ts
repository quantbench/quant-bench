import * as indicators from "../";

export class MIDPOINT
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MIDPOINT";
    static INDICATOR_DESCR: string = "MidPoint over period";

    constructor() {
        super(MIDPOINT.INDICATOR_NAME, MIDPOINT.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
