import * as indicators from "../";

export class MINMAX
    extends indicators.AbstractIndicator<number> {

    static MINDICATOR_NAME: string = "MINMAX";
    static MINDICATOR_DESCR: string = "Lowest and highest values over a specified period";

    constructor() {
        super(MINMAX.MINDICATOR_NAME, MINMAX.MINDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
