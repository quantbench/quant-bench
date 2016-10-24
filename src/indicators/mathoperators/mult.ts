import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MULT_INDICATOR_NAME: string = "MULT";
export const MULT_INDICATOR_DESCR: string = "Vector Arithmetic Mult";

export class MULT
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MULT_INDICATOR_NAME, MULT_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
