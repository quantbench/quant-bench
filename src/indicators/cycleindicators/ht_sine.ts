import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class HTSINE
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static HTSINE_INDICATOR_NAME: string = "HTSINE";
    static HTSINE_INDICATOR_DESCR: string = "Hilbert Transform - SineWave";

    constructor() {
        super(HTSINE.HTSINE_INDICATOR_NAME, HTSINE.HTSINE_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
