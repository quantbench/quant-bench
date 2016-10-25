import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLHARAMICROSS
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLHARAMICROSS_INDICATOR_NAME: string = "CDLHARAMICROSS";
    static CDLHARAMICROSS_INDICATOR_DESCR: string = "Harami Cross Pattern";

    constructor() {
        super(CDLHARAMICROSS.CDLHARAMICROSS_INDICATOR_NAME, CDLHARAMICROSS.CDLHARAMICROSS_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
