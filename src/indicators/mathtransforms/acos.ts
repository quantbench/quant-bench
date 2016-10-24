import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const ACOS_INDICATOR_NAME: string = "ACOS";
export const ACOS_INDICATOR_DESCR: string = "Vector Trigonometric ACos";

export class ACOS
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(ACOS_INDICATOR_NAME, ACOS_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
