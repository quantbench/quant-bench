import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLTRISTAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLTRISTAR_INDICATOR_NAME: string = "CDLTRISTAR";
    static CDLTRISTAR_INDICATOR_DESCR: string = "Tristar Pattern";

    constructor() {
        super(CDLTRISTAR.CDLTRISTAR_INDICATOR_NAME, CDLTRISTAR.CDLTRISTAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
