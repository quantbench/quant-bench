import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLDARKCLOUDCOVER_INDICATOR_NAME: string = "CDLDARKCLOUDCOVER";
export const CDLDARKCLOUDCOVER_INDICATOR_DESCR: string = "Dark Cloud Cover";

export class CDLDARKCLOUDCOVER
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLDARKCLOUDCOVER_INDICATOR_NAME, CDLDARKCLOUDCOVER_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
