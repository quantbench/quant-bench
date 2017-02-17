import * as indicators from "../";

export class RateOfChange
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "ROC";
    static INDICATOR_DESCR: string = "Rate of change : ((price/prevPrice)-1)*100";
    static TIMEPERIOD_DEFAULT: number = 10;
    static TIMEPERIOD_MIN: number = 1;

    public timePeriod: number;
    private periodHistory: indicators.Queue<number>;
    private periodCounter: number;
    private previousPrice: number;

    constructor(timePeriod: number = RateOfChange.TIMEPERIOD_DEFAULT) {
        super(RateOfChange.INDICATOR_NAME, RateOfChange.INDICATOR_DESCR);

        if (timePeriod < RateOfChange.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, RateOfChange.TIMEPERIOD_MIN, timePeriod)));
        }

        this.previousPrice = 0;
        this.timePeriod = timePeriod;
        this.periodCounter = timePeriod * -1;
        this.periodHistory = new indicators.Queue<number>();
        this.setLookBack(this.timePeriod);
    }

    receiveData(inputData: number): boolean {

        this.periodCounter += 1;
        this.periodHistory.enqueue(inputData);

        if (this.periodCounter > 0) {
            // Roc = (price/previousPrice - 1) * 100
            this.previousPrice = this.periodHistory.peek();

            if (this.previousPrice !== 0) {
                this.setCurrentValue(100 * ((inputData / this.previousPrice) - 1));
            } else {
                this.setCurrentValue(0);
            }
        }

        if (this.periodHistory.count > this.timePeriod) {
            this.periodHistory.dequeue();
        }

        return this.isReady;
    }
}

export class ROC extends RateOfChange {

}
