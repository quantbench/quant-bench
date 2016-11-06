import * as indicators from "../";

export class COS
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "COS";
    static INDICATOR_DESCR: string = "Vector Trigonometric Cos";

    constructor() {
        super(COS.INDICATOR_NAME, COS.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
