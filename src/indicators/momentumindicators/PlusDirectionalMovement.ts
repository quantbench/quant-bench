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

    constructor(timePeriod: number = PlusDirectionalMovement.TIMEPERIOD_DEFAULT) {
        super(PlusDirectionalMovement.INDICATOR_NAME, PlusDirectionalMovement.INDICATOR_DESCR);

        if (timePeriod < PlusDirectionalMovement.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, PlusDirectionalMovement.TIMEPERIOD_MIN, timePeriod)));
        }

        this.periodCounter = -1;
        this.previousHigh = 0;
        this.previousLow = 0;
        this.previousPlusDM = 0;
        this.timePeriod = timePeriod;
        this.setLookBack(timePeriod - 1);
    }

    receiveData(inputData: marketData.PriceBar): boolean {

        this.periodCounter += 1;
        let high = inputData.high;
        let low = inputData.low;
        let diffP = high - this.previousHigh;
        let diffM = this.previousLow - low;

        if (this.lookback === 1) {
            if (this.periodCounter > 0) {
                let result = 0;
                if ((diffP > 0) && (diffP > diffM)) {
                    result = diffP;
                } else {
                    result = 0;
                }

                this.setCurrentValue(result);
            }
        } else {
            if (this.periodCounter > 0) {
                if (this.periodCounter < this.timePeriod) {
                    if ((diffP > 0) && (diffP > diffM)) {
                        this.previousPlusDM += diffP;
                    }

                    if (this.periodCounter === this.timePeriod - 1) {
                        let result = this.previousPlusDM;

                        this.setCurrentValue(result);
                    }
                } else {
                    let result = 0;
                    if ((diffP > 0) && (diffP > diffM)) {
                        result = this.previousPlusDM - (this.previousPlusDM / this.timePeriod) + diffP;
                    } else {
                        result = this.previousPlusDM - (this.previousPlusDM / this.timePeriod);
                    }

                    this.setCurrentValue(result);

                    this.previousPlusDM = result;
                }
            }
        }

        this.previousHigh = high;
        this.previousLow = low;

        return this.isReady;
    }
}

export class PLUSDM extends PlusDirectionalMovement {

}
