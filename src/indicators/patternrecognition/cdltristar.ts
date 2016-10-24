import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLTRISTAR_INDICATOR_NAME: string = "CDLTRISTAR";
export const CDLTRISTAR_INDICATOR_DESCR: string = "Tristar Pattern";

export class CDLTRISTAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLTRISTAR_INDICATOR_NAME, CDLTRISTAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
