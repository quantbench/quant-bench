import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLDOJISTAR_INDICATOR_NAME: string = "CDLDOJISTAR";
export const CDLDOJISTAR_INDICATOR_DESCR: string = "Doji Star";

export class CDLDOJISTAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLDOJISTAR_INDICATOR_NAME, CDLDOJISTAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
