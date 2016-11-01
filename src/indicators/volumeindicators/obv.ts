import * as indicators from "../";
import * as marketData from "../../data/market/";

export class OBV
    extends indicators.AbstractIndicator<marketData.IPriceVolumeBar, number>
    implements indicators.IIndicator<marketData.IPriceVolumeBar, number> {

    static INDICATOR_NAME: string = "OBV";
    static INDICATOR_DESCR: string = "On Balance Volume";

    private previousObv: number;
    private previousClose: number;
    private periodCounter: number;

    constructor() {
        super(OBV.INDICATOR_NAME, OBV.INDICATOR_DESCR);

        this.previousObv = 0;
        this.previousClose = 0;
        this.periodCounter = -1;
    }

    receiveData(inputData: marketData.IPriceVolumeBar): boolean {

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
