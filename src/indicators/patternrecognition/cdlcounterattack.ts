import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLCOUNTERATTACK
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLCOUNTERATTACK_INDICATOR_NAME: string = "CDLCOUNTERATTACK";
    static CDLCOUNTERATTACK_INDICATOR_DESCR: string = "Counterattack";

    constructor() {
        super(CDLCOUNTERATTACK.CDLCOUNTERATTACK_INDICATOR_NAME, CDLCOUNTERATTACK.CDLCOUNTERATTACK_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
