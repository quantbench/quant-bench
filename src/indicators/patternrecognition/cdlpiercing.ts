import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLPIERCING
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLPIERCING_INDICATOR_NAME: string = "CDLPIERCING";
    static CDLPIERCING_INDICATOR_DESCR: string = "Piercing Pattern";

    constructor() {
        super(CDLPIERCING.CDLPIERCING_INDICATOR_NAME, CDLPIERCING.CDLPIERCING_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
