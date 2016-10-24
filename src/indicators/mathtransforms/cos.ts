import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const COS_INDICATOR_NAME: string = "COS";
export const COS_INDICATOR_DESCR: string = "Vector Trigonometric Cos";

export class COS
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(COS_INDICATOR_NAME, COS_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
