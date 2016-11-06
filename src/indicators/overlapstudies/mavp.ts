import * as indicators from "../";

export class MAVP
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MAVP";
    static INDICATOR_DESCR: string = "Moving average with variable period";

    constructor() {
        super(MAVP.INDICATOR_NAME, MAVP.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
