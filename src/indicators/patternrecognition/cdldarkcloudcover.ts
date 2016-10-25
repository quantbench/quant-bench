import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLDARKCLOUDCOVER
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLDARKCLOUDCOVER_INDICATOR_NAME: string = "CDLDARKCLOUDCOVER";
    static CDLDARKCLOUDCOVER_INDICATOR_DESCR: string = "Dark Cloud Cover";

    constructor() {
        super(CDLDARKCLOUDCOVER.CDLDARKCLOUDCOVER_INDICATOR_NAME, CDLDARKCLOUDCOVER.CDLDARKCLOUDCOVER_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
