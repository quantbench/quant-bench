import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLABANDONEDBABY
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLABANDONEDBABY_INDICATOR_NAME: string = "CDLABANDONEDBABY";
    static CDLABANDONEDBABY_INDICATOR_DESCR: string = "Abandoned Baby";

    constructor() {
        super(CDLABANDONEDBABY.CDLABANDONEDBABY_INDICATOR_NAME, CDLABANDONEDBABY.CDLABANDONEDBABY_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
