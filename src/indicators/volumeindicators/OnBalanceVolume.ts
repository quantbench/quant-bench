import * as indicators from "../";
import * as marketData from "../../data/market/";

export class OnBalanceVolume
    extends indicators.AbstractIndicator<marketData.PriceVolumeBar> {

    static INDICATOR_NAME: string = "OBV";
    static INDICATOR_DESCR: string = "On Balance Volume";

    private previousObv: number;
    private previousClose: number;
    private periodCounter: number;

    constructor() {
        super(OnBalanceVolume.INDICATOR_NAME, OnBalanceVolume.INDICATOR_DESCR);

        this.previousObv = 0;
        this.previousClose = 0;
        this.periodCounter = -1;
    }

    receiveData(inputData: marketData.PriceVolumeBar): boolean {

        this.periodCounter += 1;

        if (this.periodCounter <= 0) {
            this.previousClose = inputData.close;
            this.previousObv = inputData.volume;
            this.setCurrentValue(this.previousObv);
        } else {
            if (inputData.close > this.previousClose) {
                this.previousObv += inputData.volume;
            } else if (inputData.close < this.previousClose) {
                this.previousObv -= inputData.volume;
            }
            this.previousClose = inputData.close;
            this.setCurrentValue(this.previousObv);
        }

        return this.isReady;
    }
}

export class OBV extends OnBalanceVolume {

}
