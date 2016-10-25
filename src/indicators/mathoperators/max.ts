import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MAX
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MAX_INDICATOR_NAME: string = "MAX";
    static MAX_INDICATOR_DESCR: string = "Highest value over a specified period";

    constructor() {
        super(MAX.MAX_INDICATOR_NAME, MAX.MAX_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
