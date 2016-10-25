import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class DX
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static DX_INDICATOR_NAME: string = "DX";
    static DX_INDICATOR_DESCR: string = "Directional Movement Index";

    constructor() {
        super(DX.DX_INDICATOR_NAME, DX.DX_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
