import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLSHOOTINGSTAR_INDICATOR_NAME: string = "CDLSHOOTINGSTAR";
export const CDLSHOOTINGSTAR_INDICATOR_DESCR: string = "Shooting Star";

export class CDLSHOOTINGSTAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLSHOOTINGSTAR_INDICATOR_NAME, CDLSHOOTINGSTAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
