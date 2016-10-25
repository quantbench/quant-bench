import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class FLOOR
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static FLOOR_INDICATOR_NAME: string = "FLOOR";
    static FLOOR_INDICATOR_DESCR: string = "Vector Floor";

    constructor() {
        super(FLOOR.FLOOR_INDICATOR_NAME, FLOOR.FLOOR_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
