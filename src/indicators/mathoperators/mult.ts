import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MULT
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MULT_INDICATOR_NAME: string = "MULT";
    static MULT_INDICATOR_DESCR: string = "Vector Arithmetic Mult";

    constructor() {
        super(MULT.MULT_INDICATOR_NAME, MULT.MULT_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
