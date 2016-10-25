import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class COS
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static COS_INDICATOR_NAME: string = "COS";
    static COS_INDICATOR_DESCR: string = "Vector Trigonometric Cos";

    constructor() {
        super(COS.COS_INDICATOR_NAME, COS.COS_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
