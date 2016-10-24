import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLLONGLEGGEDDOJI_INDICATOR_NAME: string = "CDLLONGLEGGEDDOJI";
export const CDLLONGLEGGEDDOJI_INDICATOR_DESCR: string = "Long Legged Doji";

export class CDLLONGLEGGEDDOJI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLLONGLEGGEDDOJI_INDICATOR_NAME, CDLLONGLEGGEDDOJI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
