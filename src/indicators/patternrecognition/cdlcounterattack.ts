import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLCOUNTERATTACK_INDICATOR_NAME: string = "CDLCOUNTERATTACK";
export const CDLCOUNTERATTACK_INDICATOR_DESCR: string = "Counterattack";

export class CDLCOUNTERATTACK
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLCOUNTERATTACK_INDICATOR_NAME, CDLCOUNTERATTACK_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
