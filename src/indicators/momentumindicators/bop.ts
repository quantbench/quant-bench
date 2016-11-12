import * as indicators from "../";
import * as marketData from "../../data/market/";

export class BOP
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "BOP";
    static INDICATOR_DESCR: string = "Balance Of Power";

    private highLow: number;
    constructor() {
        super(BOP.INDICATOR_NAME, BOP.INDICATOR_DESCR);

        this.highLow = 0;
        this.setLookBack(0);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.highLow = inputData.high - inputData.low;
        if (this.highLow === 0) {
            this.setCurrentValue(0);
        } else {
            this.setCurrentValue((inputData.close - inputData.open) / (this.highLow));
        }
        return this.isReady;
    }
}
