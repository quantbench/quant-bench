import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class CDLHOMINGPIGEON
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static CDLHOMINGPIGEON_INDICATOR_NAME: string = "CDLHOMINGPIGEON";
    static CDLHOMINGPIGEON_INDICATOR_DESCR: string = "Homing Pigeon";

    constructor() {
        super(CDLHOMINGPIGEON.CDLHOMINGPIGEON_INDICATOR_NAME, CDLHOMINGPIGEON.CDLHOMINGPIGEON_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
