import * as indicators from "../";

export class HTSINE
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "HTSINE";
    static INDICATOR_DESCR: string = "Hilbert Transform - SineWave";

    constructor() {
        super(HTSINE.INDICATOR_NAME, HTSINE.INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
