import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const ADD_INDICATOR_NAME: string = "ADD";
export const ADD_INDICATOR_DESCR: string = "Vector Arithmetic Add";

export class ADD
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(ADD_INDICATOR_NAME, ADD_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
