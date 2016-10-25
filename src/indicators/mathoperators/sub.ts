import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class SUB
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static SUB_INDICATOR_NAME: string = "SUB";
    static SUB_INDICATOR_DESCR: string = "Vector Arithmetic Substraction";

    constructor() {
        super(SUB.SUB_INDICATOR_NAME, SUB.SUB_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
