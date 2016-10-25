import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDL2CROWS
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDL2CROWS_INDICATOR_NAME: string = "CDL2CROWS";
    static CDL2CROWS_INDICATOR_DESCR: string = "Two Crows";

    constructor() {
        super(CDL2CROWS.CDL2CROWS_INDICATOR_NAME, CDL2CROWS.CDL2CROWS_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
