import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class TANH
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static TANH_INDICATOR_NAME: string = "TANH";
    static TANH_INDICATOR_DESCR: string = "Vector Trigonometric Tanh";

    constructor() {
        super(TANH.TANH_INDICATOR_NAME, TANH.TANH_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
