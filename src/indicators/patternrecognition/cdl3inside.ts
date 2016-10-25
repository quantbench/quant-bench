import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDL3INSIDE
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDL3INSIDE_INDICATOR_NAME: string = "CDL3INSIDE";
    static CDL3INSIDE_INDICATOR_DESCR: string = "Three Inside Up/Down";

    constructor() {
        super(CDL3INSIDE.CDL3INSIDE_INDICATOR_NAME, CDL3INSIDE.CDL3INSIDE_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
