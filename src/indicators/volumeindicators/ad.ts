import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class AD
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static AD_INDICATOR_NAME: string = "AD";
    static AD_INDICATOR_DESCR: string = "Chaikin A/D Line";

    constructor() {
        super(AD.AD_INDICATOR_NAME, AD.AD_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
