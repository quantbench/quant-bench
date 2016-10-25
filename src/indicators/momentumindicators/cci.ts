import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CCI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CCI_INDICATOR_NAME: string = "CCI";
    static CCI_INDICATOR_DESCR: string = "Commodity Channel Index";

    constructor() {
        super(CCI.CCI_INDICATOR_NAME, CCI.CCI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
