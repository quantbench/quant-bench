import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const SIN_INDICATOR_NAME: string = "SIN";
export const SIN_INDICATOR_DESCR: string = "Vector Trigonometric Sin";

export class SIN
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(SIN_INDICATOR_NAME, SIN_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
