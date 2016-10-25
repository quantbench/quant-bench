import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class ACOS
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static ACOS_INDICATOR_NAME: string = "ACOS";
    static ACOS_INDICATOR_DESCR: string = "Vector Trigonometric ACos";

    constructor() {
        super(ACOS.ACOS_INDICATOR_NAME, ACOS.ACOS_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
