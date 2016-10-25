import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLHARAMI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLHARAMI_INDICATOR_NAME: string = "CDLHARAMI";
    static CDLHARAMI_INDICATOR_DESCR: string = "Harami Pattern";

    constructor() {
        super(CDLHARAMI.CDLHARAMI_INDICATOR_NAME, CDLHARAMI.CDLHARAMI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
