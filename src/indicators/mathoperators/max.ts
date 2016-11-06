import * as indicators from "../";

export class MAX
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MAX";
    static INDICATOR_DESCR: string = "Highest value over a specified period";

    constructor() {
        super(MAX.INDICATOR_NAME, MAX.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
