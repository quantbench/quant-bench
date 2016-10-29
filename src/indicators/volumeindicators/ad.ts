import * as indicators from "../";
import * as marketData from "../../data/market/";

export class AD
    extends indicators.AbstractIndicator<marketData.IPriceVolumeBar, number>
    implements indicators.IIndicator<marketData.IPriceVolumeBar, number> {

    static INDICATOR_NAME: string = "AD";
    static INDICATOR_DESCR: string = "Chaikin A/D Line";

    private currentADL: number;

    constructor() {
        super(AD.INDICATOR_NAME, AD.INDICATOR_DESCR);

        this.currentADL = 0;
        this.setLookBack(0);
    }

    receiveData(inputData: marketData.IPriceVolumeBar): boolean {
        let highLow = inputData.high - inputData.low;

        if (highLow > 0) {
            this.currentADL += ((inputData.close - inputData.low) - (inputData.high - inputData.close)) /
                (inputData.high - inputData.low) * inputData.volume;
        }
        this.setCurrentValue(this.currentADL);
        return this.isReady;
    }
}
