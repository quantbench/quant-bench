import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class SINH
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static SINH_INDICATOR_NAME: string = "SINH";
    static SINH_INDICATOR_DESCR: string = "Vector Trigonometric Sinh";

    constructor() {
        super(SINH.SINH_INDICATOR_NAME, SINH.SINH_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
