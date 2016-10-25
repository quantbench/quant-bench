import * as indicators from "../";
import { AbstractIndicator } from "../abstractIndicator";

export class EMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static EMA_INDICATOR_NAME: string = "EMA";
    static EMA_INDICATOR_DESCR: string = "Exponential Moving Average";
    static EMA_TIMEPERIOD_DEFAULT: number = 30;
    static EMA_TIMEPERIOD_MIN: number = 2;

    timePeriod: number;
    multiplier: number;
    periodCounter: number;
    previousEma: number;
    periodTotal: number;

    constructor(timePeriod: number) {
        super(EMA.EMA_INDICATOR_NAME, EMA.EMA_INDICATOR_DESCR);
        if (timePeriod === undefined) {
            this.timePeriod = EMA.EMA_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < EMA.EMA_TIMEPERIOD_MIN) {
                throw (new Error(indicators.generateMinTimePeriodError(this.name, EMA.EMA_TIMEPERIOD_MIN, timePeriod)));
            }
        }

        this.timePeriod = timePeriod;
        this.multiplier = 2 / (timePeriod + 1);
        this.periodCounter = timePeriod * -1;
        this.periodTotal = 0;

        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {

        this.periodCounter += 1;
        if (this.periodCounter < 0) {
            this.periodTotal += inputData;
        } else if (this.periodCounter === 0) {
            this.periodTotal += inputData;
            this.setCurrentValue(this.periodTotal / this.timePeriod);
            this.setIsReady();
        } else if (this.periodCounter > 0) {
            this.setCurrentValue((inputData - this.previousEma) * this.multiplier + this.previousEma);
        }
        this.previousEma = this.currentValue;
        return this.isReady;
    }
}
