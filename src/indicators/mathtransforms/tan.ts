import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const TAN_INDICATOR_NAME: string = "TAN";
export const TAN_INDICATOR_DESCR: string = "Vector Trigonometric Tan";

export class TAN
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(TAN_INDICATOR_NAME, TAN_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
