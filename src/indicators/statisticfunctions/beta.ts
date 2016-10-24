import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const BETA_INDICATOR_NAME: string = "BETA";
export const BETA_INDICATOR_DESCR: string = "Beta";

export class BETA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(BETA_INDICATOR_NAME, BETA_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
