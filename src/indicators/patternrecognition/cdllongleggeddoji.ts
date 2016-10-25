import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLLONGLEGGEDDOJI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLLONGLEGGEDDOJI_INDICATOR_NAME: string = "CDLLONGLEGGEDDOJI";
    static CDLLONGLEGGEDDOJI_INDICATOR_DESCR: string = "Long Legged Doji";

    constructor() {
        super(CDLLONGLEGGEDDOJI.CDLLONGLEGGEDDOJI_INDICATOR_NAME, CDLLONGLEGGEDDOJI.CDLLONGLEGGEDDOJI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
