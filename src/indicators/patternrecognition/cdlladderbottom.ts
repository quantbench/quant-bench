import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLLADDERBOTTOM
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLLADDERBOTTOM_INDICATOR_NAME: string = "CDLLADDERBOTTOM";
    static CDLLADDERBOTTOM_INDICATOR_DESCR: string = "Ladder Bottom";

    constructor() {
        super(CDLLADDERBOTTOM.CDLLADDERBOTTOM_INDICATOR_NAME, CDLLADDERBOTTOM.CDLLADDERBOTTOM_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
