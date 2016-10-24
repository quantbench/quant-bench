import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLIDENTICAL3CROWS_INDICATOR_NAME: string = "CDLIDENTICAL3CROWS";
export const CDLIDENTICAL3CROWS_INDICATOR_DESCR: string = "Identical Three Crows";

export class CDLIDENTICAL3CROWS
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLIDENTICAL3CROWS_INDICATOR_NAME, CDLIDENTICAL3CROWS_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
