import * as indicators from "../";

export class EMA
    extends indicators.AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static INDICATOR_NAME: string = "EMA";
    static INDICATOR_DESCR: string = "Exponential Moving Average";
    static TIMEPERIOD_DEFAULT: number = 30;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private multiplier: number;
    private periodCounter: number;
    private previousEma: number;
    private periodTotal: number;

    constructor(timePeriod: number = EMA.TIMEPERIOD_DEFAULT) {
        super(EMA.INDICATOR_NAME, EMA.INDICATOR_DESCR);

        if (timePeriod < EMA.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, EMA.TIMEPERIOD_MIN, timePeriod)));
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
        } else if (this.periodCounter > 0) {
            this.setCurrentValue((inputData - this.previousEma) * this.multiplier + this.previousEma);
        }
        this.previousEma = this.currentValue;
        return this.isReady;
    }
}
