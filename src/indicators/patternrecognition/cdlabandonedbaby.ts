import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLABANDONEDBABY_INDICATOR_NAME: string = "CDLABANDONEDBABY";
export const CDLABANDONEDBABY_INDICATOR_DESCR: string = "Abandoned Baby";

export class CDLABANDONEDBABY
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLABANDONEDBABY_INDICATOR_NAME, CDLABANDONEDBABY_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
