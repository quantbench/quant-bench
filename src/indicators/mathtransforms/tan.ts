import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class TAN
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static TAN_INDICATOR_NAME: string = "TAN";
    static TAN_INDICATOR_DESCR: string = "Vector Trigonometric Tan";

    constructor() {
        super(TAN.TAN_INDICATOR_NAME, TAN.TAN_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
