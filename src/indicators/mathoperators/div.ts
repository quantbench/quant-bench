import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class DIV
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static DIV_INDICATOR_NAME: string = "DIV";
    static DIV_INDICATOR_DESCR: string = "Vector Arithmetic Div";

    constructor() {
        super(DIV.DIV_INDICATOR_NAME, DIV.DIV_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
