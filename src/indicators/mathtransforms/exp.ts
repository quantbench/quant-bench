import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const EXP_INDICATOR_NAME: string = "EXP";
export const EXP_INDICATOR_DESCR: string = "Vector Arithmetic Exp";

export class EXP
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(EXP_INDICATOR_NAME, EXP_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
