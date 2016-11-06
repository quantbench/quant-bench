import * as indicators from "../";

export class MIN
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MIN";
    static INDICATOR_DESCR: string = "Lowest value over a specified period";

    constructor() {
        super(MIN.INDICATOR_NAME, MIN.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
