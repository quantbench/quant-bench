import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const FLOOR_INDICATOR_NAME: string = "FLOOR";
export const FLOOR_INDICATOR_DESCR: string = "Vector Floor";

export class FLOOR
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(FLOOR_INDICATOR_NAME, FLOOR_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
