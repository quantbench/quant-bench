import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLHARAMICROSS_INDICATOR_NAME: string = "CDLHARAMICROSS";
export const CDLHARAMICROSS_INDICATOR_DESCR: string = "Harami Cross Pattern";

export class CDLHARAMICROSS
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLHARAMICROSS_INDICATOR_NAME, CDLHARAMICROSS_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
