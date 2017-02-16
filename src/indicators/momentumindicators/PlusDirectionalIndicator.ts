import * as indicators from "../";
import * as marketData from "../../data/market/";

export class PlusDirectionalIndicator
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "PLUSDI";
    static INDICATOR_DESCR: string = "Plus Directional Indicator";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 1;

    public timePeriod: number;

    private periodCounter: number;
    private previousHigh: number;
    private previousLow: number;
    private previousPlusDM: number;
    private previousTrueRange: number;
    private currentTrueRange: number;
    private trueRange: indicators.TRANGE;

    constructor(timePeriod: number = PlusDirectionalIndicator.TIMEPERIOD_DEFAULT) {
        super(PlusDirectionalIndicator.INDICATOR_NAME, PlusDirectionalIndicator.INDICATOR_DESCR);

        if (timePeriod < PlusDirectionalIndicator.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, PlusDirectionalIndicator.TIMEPERIOD_MIN, timePeriod)));
        }

        this.periodCounter = -1;
        this.trueRange = new indicators.TRANGE();
        this.trueRange.on("data", (data: number) => this.receiveTRangeData(data));
        this.previousHigh = 0;
        this.previousLow = 0;
        this.previousPlusDM = 0;
        this.previousTrueRange = 0;
        this.currentTrueRange = 0;
        this.timePeriod = timePeriod;
        this.setLookBack(timePeriod);
    }

    receiveData(inputData: marketData.PriceBar): boolean {

        // forward to the true range indicator first using previous data
        this.trueRange.receiveData(inputData);

        this.periodCounter += 1;
        let high = inputData.high;
        let low = inputData.low;
        let diffP = high - this.previousHigh;
        let diffM = this.previousLow - low;

        if (this.lookback === 1) {
            if (this.periodCounter > 0) {
                // forward to the true range indicator first using previous data
                this.trueRange.receiveData(inputData);

                let result = 0;
                if ((diffP > 0) && (diffP > diffM) && this.currentTrueRange !== 0) {
                    result = diffP / this.currentTrueRange;
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
                    this.previousTrueRange += this.currentTrueRange;
                } else {
                    let result = 0;
                    this.previousTrueRange = this.previousTrueRange - (this.previousTrueRange / this.timePeriod) + this.currentTrueRange;
                    if ((diffP > 0) && (diffP > diffM)) {
                        this.previousPlusDM = this.previousPlusDM - (this.previousPlusDM / this.timePeriod) + diffP;
                    } else {
                        this.previousPlusDM = this.previousPlusDM - (this.previousPlusDM / this.timePeriod);
                    }

                    if (this.previousTrueRange !== 0) {
                        result = 100.0 * this.previousPlusDM / this.previousTrueRange;
                    } else {
                        result = 0;
                    }

                    this.setCurrentValue(result);
                }
            }
        }

        this.previousHigh = high;
        this.previousLow = low;

        return this.isReady;
    }

    private receiveTRangeData(data: number) {
        this.currentTrueRange = data;
    }
}

export class PLUSDI extends PlusDirectionalIndicator {

}
