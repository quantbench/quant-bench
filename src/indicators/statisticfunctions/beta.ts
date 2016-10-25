import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class BETA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static BETA_INDICATOR_NAME: string = "BETA";
    static BETA_INDICATOR_DESCR: string = "Beta";

    constructor() {
        super(BETA.BETA_INDICATOR_NAME, BETA.BETA_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
