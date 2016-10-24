import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const TANH_INDICATOR_NAME: string = "TANH";
export const TANH_INDICATOR_DESCR: string = "Vector Trigonometric Tanh";

export class TANH
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(TANH_INDICATOR_NAME, TANH_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
