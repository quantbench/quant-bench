import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const DIV_INDICATOR_NAME: string = "DIV";
export const DIV_INDICATOR_DESCR: string = "Vector Arithmetic Div";

export class DIV
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(DIV_INDICATOR_NAME, DIV_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
