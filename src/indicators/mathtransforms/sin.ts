import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class SIN
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static SIN_INDICATOR_NAME: string = "SIN";
    static SIN_INDICATOR_DESCR: string = "Vector Trigonometric Sin";

    constructor() {
        super(SIN.SIN_INDICATOR_NAME, SIN.SIN_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
