import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const SUB_INDICATOR_NAME: string = "SUB";
export const SUB_INDICATOR_DESCR: string = "Vector Arithmetic Substraction";

export class SUB
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(SUB_INDICATOR_NAME, SUB_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
