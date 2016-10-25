import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLIDENTICAL3CROWS
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLIDENTICAL3CROWS_INDICATOR_NAME: string = "CDLIDENTICAL3CROWS";
    static CDLIDENTICAL3CROWS_INDICATOR_DESCR: string = "Identical Three Crows";

    constructor() {
        super(CDLIDENTICAL3CROWS.CDLIDENTICAL3CROWS_INDICATOR_NAME, CDLIDENTICAL3CROWS.CDLIDENTICAL3CROWS_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
