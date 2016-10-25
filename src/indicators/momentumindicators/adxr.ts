import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class ADXR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static ADXR_INDICATOR_NAME: string = "ADXR";
    static ADXR_INDICATOR_DESCR: string = "Average Directional Movement Index Rating";

    constructor() {
        super(ADXR.ADXR_INDICATOR_NAME, ADXR.ADXR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
