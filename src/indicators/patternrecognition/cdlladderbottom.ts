import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLLADDERBOTTOM_INDICATOR_NAME: string = "CDLLADDERBOTTOM";
export const CDLLADDERBOTTOM_INDICATOR_DESCR: string = "Ladder Bottom";

export class CDLLADDERBOTTOM
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLLADDERBOTTOM_INDICATOR_NAME, CDLLADDERBOTTOM_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
