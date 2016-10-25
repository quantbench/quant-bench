import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class SAR
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static SAR_INDICATOR_NAME: string = "SAR";
    static SAR_INDICATOR_DESCR: string = "Parabolic SAR";

    constructor() {
        super(SAR.SAR_INDICATOR_NAME, SAR.SAR_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
