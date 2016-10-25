import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDL3STARSINSOUTH
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDL3STARSINSOUTH_INDICATOR_NAME: string = "CDL3STARSINSOUTH";
    static CDL3STARSINSOUTH_INDICATOR_DESCR: string = "Three Stars In The South";

    constructor() {
        super(CDL3STARSINSOUTH.CDL3STARSINSOUTH_INDICATOR_NAME, CDL3STARSINSOUTH.CDL3STARSINSOUTH_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
