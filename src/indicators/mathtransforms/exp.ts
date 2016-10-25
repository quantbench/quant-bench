import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class EXP
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static EXP_INDICATOR_NAME: string = "EXP";
    static EXP_INDICATOR_DESCR: string = "Vector Arithmetic Exp";

    constructor() {
        super(EXP.EXP_INDICATOR_NAME, EXP.EXP_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
