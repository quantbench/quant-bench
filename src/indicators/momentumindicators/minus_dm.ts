import * as indicators from "../";
import * as marketData from "../../data/market/";

export class MINUSDM
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "MINUSDM";
    static INDICATOR_DESCR: string = "Minus Directional Movement";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 1;

    public timePeriod: number;

    private periodCounter: number;
    private previousHigh: number;
    private previousLow: number;
    private previousMinusDM: number;

    constructor(timePeriod: number = MINUSDM.TIMEPERIOD_DEFAULT) {
        super(MINUSDM.INDICATOR_NAME, MINUSDM.INDICATOR_DESCR);

        if (timePeriod < MINUSDM.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, MINUSDM.TIMEPERIOD_MIN, timePeriod)));
        }

        this.periodCounter = -1;

        this.previousHigh = 0;
        this.previousLow = 0;
        this.previousMinusDM = 0;
        this.timePeriod = timePeriod;
        this.setLookBack(timePeriod - 1);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.periodCounter += 1;
        let high = inputData.high;
        let low = inputData.low;
        let diffP = high - this.previousHigh;
        let diffM = this.previousLow - low;

        if (this.lookback === 1) {
            if (this.periodCounter > 0) {
                let result = 0;
                if ((diffM > 0) && (diffP < diffM)) {
                    result = diffM;
                } else {
                    result = 0;
                }

                this.setCurrentValue(result);
            }
        } else {
            if (this.periodCounter > 0) {
                if (this.periodCounter < this.timePeriod) {
                    if ((diffM > 0) && (diffP < diffM)) {
                        this.previousMinusDM += diffM;
                    }

                    if (this.periodCounter === this.timePeriod - 1) {
                        let result = this.previousMinusDM;

                        this.setCurrentValue(result);
                    }
                } else {
                    let result = 0;
                    if ((diffM > 0) && (diffP < diffM)) {
                        result = this.previousMinusDM - (this.previousMinusDM / this.timePeriod) + diffM;
                    } else {
                        result = this.previousMinusDM - (this.previousMinusDM / this.timePeriod);
                    }

                    this.setCurrentValue(result);

                    this.previousMinusDM = result;
                }
            }
        }

        this.previousHigh = high;
        this.previousLow = low;
        return this.isReady;
    }
}
