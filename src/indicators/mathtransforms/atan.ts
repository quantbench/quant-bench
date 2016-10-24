import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const ATAN_INDICATOR_NAME: string = "ATAN";
export const ATAN_INDICATOR_DESCR: string = "Vector Trigonometric ATan";

export class ATAN
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(ATAN_INDICATOR_NAME, ATAN_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
