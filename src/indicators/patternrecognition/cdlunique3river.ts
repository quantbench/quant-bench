import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLUNIQUE3RIVER_INDICATOR_NAME: string = "CDLUNIQUE3RIVER";
export const CDLUNIQUE3RIVER_INDICATOR_DESCR: string = "Unique 3 River";

export class CDLUNIQUE3RIVER
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLUNIQUE3RIVER_INDICATOR_NAME, CDLUNIQUE3RIVER_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
