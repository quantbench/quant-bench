import * as indicators from "../";
import * as marketData from "../../data/market/";

export class PlusDirectionalMovement
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "PLUSDM";
    static INDICATOR_DESCR: string = "Plus Directional Movement";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 1;

    public timePeriod: number;

    private periodCounter: number;
    private previousHigh: number;
    private previousLow: number;
    private previousPlusDM: number;
    private currentHigh: number;
    private currentLow: number;
    private diffP: number;
    private diffM: number;

    constructor(timePeriod: number = PlusDirectionalMovement.TIMEPERIOD_DEFAULT) {
        super(PlusDirectionalMovement.INDICATOR_NAME, PlusDirectionalMovement.INDICATOR_DESCR);

        if (timePeriod < PlusDirectionalMovement.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, PlusDirectionalMovement.TIMEPERIOD_MIN, timePeriod)));
        }

        this.periodCounter = -1;
        this.previousHigh = 0;
        this.previousLow = 0;
        this.previousPlusDM = 0;
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
                let result = 0;
                if ((this.diffP > 0) && (this.diffP > this.diffM)) {
                    result = this.diffP;
                } else {
                    result = 0;
                }

                this.setCurrentValue(result);
            }
        } else {
            if (this.periodCounter > 0) {
                if (this.periodCounter < this.timePeriod) {
                    if ((this.diffP > 0) && (this.diffP > this.diffM)) {
                        this.previousPlusDM += this.diffP;
                    }

                    if (this.periodCounter === this.timePeriod - 1) {
                        this.setCurrentValue(this.previousPlusDM);
                    }
                } else {
                    let result = 0;
                    if ((this.diffP > 0) && (this.diffP > this.diffM)) {
                        result = this.previousPlusDM - (this.previousPlusDM / this.timePeriod) + this.diffP;
                    } else {
                        result = this.previousPlusDM - (this.previousPlusDM / this.timePeriod);
                    }

                    this.setCurrentValue(result);

                    this.previousPlusDM = result;
                }
            }
        }

        this.previousHigh = this.currentHigh;
        this.previousLow = this.currentLow;

        return this.isReady;
    }
}

export class PLUSDM extends PlusDirectionalMovement {

}
