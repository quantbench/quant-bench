import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const AVGDEV_INDICATOR_NAME: string = "AVGDEV";
export const AVGDEV_INDICATOR_DESCR: string = "Average Deviation";

export class AVGDEV
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(AVGDEV_INDICATOR_NAME, AVGDEV_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
