import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const ADXR_INDICATOR_NAME: string = "ADXR";
export const ADXR_INDICATOR_DESCR: string = "Average Directional Movement Index Rating";

export class ADXR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(ADXR_INDICATOR_NAME, ADXR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
