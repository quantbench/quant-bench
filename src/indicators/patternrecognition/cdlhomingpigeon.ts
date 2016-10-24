import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export const CDLHOMINGPIGEON_INDICATOR_NAME: string = "CDLHOMINGPIGEON";
export const CDLHOMINGPIGEON_INDICATOR_DESCR: string = "Homing Pigeon";

export class CDLHOMINGPIGEON
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    constructor() {
        super(CDLHOMINGPIGEON_INDICATOR_NAME, CDLHOMINGPIGEON_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
