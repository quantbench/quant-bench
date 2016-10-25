import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class MOM
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static MOM_INDICATOR_NAME: string = "MOM";
    static MOM_INDICATOR_DESCR: string = "Momentum";

    constructor() {
        super(MOM.MOM_INDICATOR_NAME, MOM.MOM_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
