import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const SINH_INDICATOR_NAME: string = "SINH";
export const SINH_INDICATOR_DESCR: string = "Vector Trigonometric Sinh";

export class SINH
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(SINH_INDICATOR_NAME, SINH_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
