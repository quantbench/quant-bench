import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class AVGDEV
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static AVGDEV_INDICATOR_NAME: string = "AVGDEV";
    static AVGDEV_INDICATOR_DESCR: string = "Average Deviation";

    constructor() {
        super(AVGDEV.AVGDEV_INDICATOR_NAME, AVGDEV.AVGDEV_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
