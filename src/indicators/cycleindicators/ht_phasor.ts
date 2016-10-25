import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export class HTPHASOR
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static HTPHASOR_INDICATOR_NAME: string = "HTPHASOR";
    static HTPHASOR_INDICATOR_DESCR: string = "Hilbert Transform - Phasor Components";

    constructor() {
        super(HTPHASOR.HTPHASOR_INDICATOR_NAME, HTPHASOR.HTPHASOR_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
