import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDL3LINESTRIKE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDL3LINESTRIKE_INDICATOR_NAME: string = "CDL3LINESTRIKE";
    static CDL3LINESTRIKE_INDICATOR_DESCR: string = "Three-Line Strike ";

    constructor() {
        super(CDL3LINESTRIKE.CDL3LINESTRIKE_INDICATOR_NAME, CDL3LINESTRIKE.CDL3LINESTRIKE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
