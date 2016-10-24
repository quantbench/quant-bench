import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLPIERCING_INDICATOR_NAME: string = "CDLPIERCING";
export const CDLPIERCING_INDICATOR_DESCR: string = "Piercing Pattern";

export class CDLPIERCING
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLPIERCING_INDICATOR_NAME, CDLPIERCING_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
