import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const MOM_INDICATOR_NAME: string = "MOM";
export const MOM_INDICATOR_DESCR: string = "Momentum";

export class MOM
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(MOM_INDICATOR_NAME, MOM_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
