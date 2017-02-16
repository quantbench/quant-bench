import * as indicators from "../";

export class RateOfChangeRatio100
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "ROCR100";
    static INDICATOR_DESCR: string = "Rate of change ratio 100 scale: (price/prevPrice)*100";
    static TIMEPERIOD_DEFAULT: number = 10;
    static TIMEPERIOD_MIN: number = 1;

    public timePeriod: number;
    private periodHistory: indicators.Queue<number>;
    private periodCounter: number;

    constructor(timePeriod: number = RateOfChangeRatio100.TIMEPERIOD_DEFAULT) {
        super(RateOfChangeRatio100.INDICATOR_NAME, RateOfChangeRatio100.INDICATOR_DESCR);

        if (timePeriod < RateOfChangeRatio100.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, RateOfChangeRatio100.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodCounter = timePeriod * -1;
        this.periodHistory = new indicators.Queue<number>();
        this.setLookBack(this.timePeriod);
    }

    receiveData(inputData: number): boolean {
        this.periodCounter += 1;
        this.periodHistory.enqueue(inputData);

        if (this.periodCounter > 0) {
            // RocR100 = (price/previousPrice - 1) * 100
            let previousPrice = this.periodHistory.peek();

            let result = 0;
            if (previousPrice !== 0) {
                result = (inputData / previousPrice) * 100;
            }

            this.setCurrentValue(result);
        }

        if (this.periodHistory.count > this.timePeriod) {
            this.periodHistory.dequeue();
        }

        return this.isReady;
    }
}

export class ROCR100 extends RateOfChangeRatio100 {

}
