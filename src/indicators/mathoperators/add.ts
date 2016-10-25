import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class ADD
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static ADD_INDICATOR_NAME: string = "ADD";
    static ADD_INDICATOR_DESCR: string = "Vector Arithmetic Add";

    constructor() {
        super(ADD.ADD_INDICATOR_NAME, ADD.ADD_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
