import * as indicators from "../";
import * as marketData from "../../data/market/";

export class MinusDirectionalMovement
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "MINUSDM";
    static INDICATOR_DESCR: string = "Minus Directional Movement";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 1;

    public timePeriod: number;

    private periodCounter: number;
    private previousHigh: number;
    private previousLow: number;
    private previousMinusDM: number;

    private currentHigh: number;
    private currentLow: number;
    private diffP: number;
    private diffM: number;

    constructor(timePeriod: number = MinusDirectionalMovement.TIMEPERIOD_DEFAULT) {
        super(MinusDirectionalMovement.INDICATOR_NAME, MinusDirectionalMovement.INDICATOR_DESCR);

        if (timePeriod < MinusDirectionalMovement.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, MinusDirectionalMovement.TIMEPERIOD_MIN, timePeriod)));
        }

        this.periodCounter = -1;

        this.previousHigh = 0;
        this.previousLow = 0;
        this.previousMinusDM = 0;
        this.currentHigh = 0;
        this.currentLow = 0;
        this.diffP = 0;
        this.diffM = 0;
        this.timePeriod = timePeriod;
        this.setLookBack(timePeriod - 1);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.periodCounter += 1;
        this.currentHigh = inputData.high;
        this.currentLow = inputData.low;
        this.diffP = this.currentHigh - this.previousHigh;
        this.diffM = this.previousLow - this.currentLow;

        if (this.lookback === 1) {
            if (this.periodCounter > 0) {
                if ((this.diffM > 0) && (this.diffP < this.diffM)) {
                    this.setCurrentValue(this.diffM);
                } else {
                    this.setCurrentValue(0);
                }
            }
        } else {
            if (this.periodCounter > 0) {
                if (this.periodCounter < this.timePeriod) {
                    if ((this.diffM > 0) && (this.diffP < this.diffM)) {
                        this.previousMinusDM += this.diffM;
                    }

                    if (this.periodCounter === this.timePeriod - 1) {
                        this.setCurrentValue(this.previousMinusDM);
                    }
                } else {
                    ((this.diffM > 0) && (this.diffP < this.diffM)) ?
                        this.previousMinusDM = this.previousMinusDM - (this.previousMinusDM / this.timePeriod) + this.diffM :
                        this.previousMinusDM = this.previousMinusDM - (this.previousMinusDM / this.timePeriod);

                    this.setCurrentValue(this.previousMinusDM);
                }
            }
        }

        this.previousHigh = this.currentHigh;
        this.previousLow = this.currentLow;
        return this.isReady;
    }
}

export class MINUSDM extends MinusDirectionalMovement {

}
