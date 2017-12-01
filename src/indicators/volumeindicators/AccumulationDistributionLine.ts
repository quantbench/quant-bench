import * as indicators from "../";
import * as marketData from "../../data/market/";

export class AccumulationDistributionLine
    extends indicators.AbstractIndicator<marketData.PriceVolumeBar> {

    static INDICATOR_NAME: string = "AD";
    static INDICATOR_DESCR: string = "Chaikin A/D Line";

    private currentADL: number;

    constructor() {
        super(AccumulationDistributionLine.INDICATOR_NAME, AccumulationDistributionLine.INDICATOR_DESCR);

        this.currentADL = 0;
        this.setLookBack(0);
    }

    receiveData(inputData: marketData.PriceVolumeBar): boolean {
        if ((inputData.high - inputData.low) > 0) {
            this.currentADL += ((inputData.close - inputData.low) - (inputData.high - inputData.close)) /
                (inputData.high - inputData.low) * inputData.volume;
        }
        this.setCurrentValue(this.currentADL);
        return this.isReady;
    }
}

export class AD extends AccumulationDistributionLine {

}
