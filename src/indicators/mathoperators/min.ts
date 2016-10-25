import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MIN
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MIN_INDICATOR_NAME: string = "MIN";
    static MIN_INDICATOR_DESCR: string = "Lowest value over a specified period";

    constructor() {
        super(MIN.MIN_INDICATOR_NAME, MIN.MIN_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
