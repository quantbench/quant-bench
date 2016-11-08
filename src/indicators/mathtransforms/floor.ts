import * as indicators from "../";

export class FLOOR
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "FLOOR";
    static INDICATOR_DESCR: string = "Vector Floor";

    constructor() {
        super(FLOOR.INDICATOR_NAME, FLOOR.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        this.setCurrentValue(Math.floor(inputData));
        return this.isReady;
    }
}
