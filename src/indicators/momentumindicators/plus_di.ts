import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class PLUSDI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static PLUSDI_INDICATOR_NAME: string = "PLUSDI";
    static PLUSDI_INDICATOR_DESCR: string = "Plus Directional Indicator";

    constructor() {
        super(PLUSDI.PLUSDI_INDICATOR_NAME, PLUSDI.PLUSDI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
