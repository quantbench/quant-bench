import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MAX_INDICATOR_NAME: string = "MAX";
export const MAX_INDICATOR_DESCR: string = "Highest value over a specified period";

export class MAX
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MAX_INDICATOR_NAME, MAX_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
