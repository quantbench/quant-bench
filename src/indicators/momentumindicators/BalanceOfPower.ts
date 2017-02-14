import * as indicators from "../";
import * as marketData from "../../data/market/";

export class BalanceOfPower
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "BOP";
    static INDICATOR_DESCR: string = "Balance Of Power";

    private highLow: number;
    constructor() {
        super(BalanceOfPower.INDICATOR_NAME, BalanceOfPower.INDICATOR_DESCR);

        this.highLow = 0;
        this.setLookBack(0);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.highLow = inputData.high - inputData.low;
        if (this.highLow === 0) {
            this.setCurrentValue(0);
        } else {
            this.setCurrentValue((inputData.close - inputData.open) / (this.highLow));
        }
        return this.isReady;
    }
}

export class BOP extends BalanceOfPower {

}
