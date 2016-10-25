import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class MFI
    extends AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static MFI_INDICATOR_NAME: string = "MFI";
    static MFI_INDICATOR_DESCR: string = "Money Flow Index";

    constructor() {
        super(MFI.MFI_INDICATOR_NAME, MFI.MFI_INDICATOR_DESCR);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        return this.isReady;
    }
}
