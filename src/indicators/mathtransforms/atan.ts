import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class ATAN
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static ATAN_INDICATOR_NAME: string = "ATAN";
    static ATAN_INDICATOR_DESCR: string = "Vector Trigonometric ATan";

    constructor() {
        super(ATAN.ATAN_INDICATOR_NAME, ATAN.ATAN_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
