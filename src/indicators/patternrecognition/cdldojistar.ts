import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLDOJISTAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLDOJISTAR_INDICATOR_NAME: string = "CDLDOJISTAR";
    static CDLDOJISTAR_INDICATOR_DESCR: string = "Doji Star";

    constructor() {
        super(CDLDOJISTAR.CDLDOJISTAR_INDICATOR_NAME, CDLDOJISTAR.CDLDOJISTAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
