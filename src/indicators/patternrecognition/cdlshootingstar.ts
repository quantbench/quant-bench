import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLSHOOTINGSTAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLSHOOTINGSTAR_INDICATOR_NAME: string = "CDLSHOOTINGSTAR";
    static CDLSHOOTINGSTAR_INDICATOR_DESCR: string = "Shooting Star";

    constructor() {
        super(CDLSHOOTINGSTAR.CDLSHOOTINGSTAR_INDICATOR_NAME, CDLSHOOTINGSTAR.CDLSHOOTINGSTAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
