import * as indicators from "../";
import * as marketData from "../../data/market/";
import { AbstractIndicator } from "../abstractIndicator";

export class AD
    extends AbstractIndicator<marketData.ITradeBar, number>
    implements indicators.IIndicator<marketData.ITradeBar, number> {

    static AD_INDICATOR_NAME: string = "AD";
    static AD_INDICATOR_DESCR: string = "Chaikin A/D Line";

    currentADL: number;

    constructor() {
        super(AD.AD_INDICATOR_NAME, AD.AD_INDICATOR_DESCR);

        this.currentADL = 0;
        this.setLookBack(0);
    }

    receiveData(inputData: marketData.ITradeBar): boolean {
        let highLow = inputData.high - inputData.low;

        if (highLow > 0) {
            this.currentADL += ((inputData.close - inputData.low) - (inputData.high - inputData.close)) /
                (inputData.high - inputData.low) * inputData.volume;
        }
        this.setCurrentValue(this.currentADL);
        return this.isReady;
    }
}
