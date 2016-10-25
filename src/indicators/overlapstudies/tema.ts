import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class TEMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static TEMA_INDICATOR_NAME: string = "TEMA";
    static TEMA_INDICATOR_DESCR: string = "Triple Exponential Moving Average";

    constructor() {
        super(TEMA.TEMA_INDICATOR_NAME, TEMA.TEMA_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
