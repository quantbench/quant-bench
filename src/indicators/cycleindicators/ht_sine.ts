import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const HTSINE_INDICATOR_NAME: string = "HTSINE";
export const HTSINE_INDICATOR_DESCR: string = "Hilbert Transform - SineWave";

export class HTSINE
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(HTSINE_INDICATOR_NAME, HTSINE_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
