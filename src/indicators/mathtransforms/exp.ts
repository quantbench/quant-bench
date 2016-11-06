import * as indicators from "../";

export class EXP
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "EXP";
    static INDICATOR_DESCR: string = "Vector Arithmetic Exp";

    constructor() {
        super(EXP.INDICATOR_NAME, EXP.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
