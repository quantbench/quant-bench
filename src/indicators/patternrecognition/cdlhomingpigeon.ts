import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CDLHOMINGPIGEON
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CDLHOMINGPIGEON";
    static INDICATOR_DESCR: string = "Homing Pigeon";

    constructor() {
        super(CDLHOMINGPIGEON.INDICATOR_NAME, CDLHOMINGPIGEON.INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
