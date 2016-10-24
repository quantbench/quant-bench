import * as indicators from "../";

import { AbstractIndicator } from "../abstractIndicator";

export const HTPHASOR_INDICATOR_NAME: string = "HTPHASOR";
export const HTPHASOR_INDICATOR_DESCR: string = "Hilbert Transform - Phasor Components";

export class HTPHASOR
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    constructor() {
        super(HTPHASOR_INDICATOR_NAME, HTPHASOR_INDICATOR_DESCR);
    }

    receiveData(inputData: number): boolean {
        return this.isReady;
    }
}
