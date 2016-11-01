import * as indicators from "../";

export class ROCR
    extends indicators.AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static INDICATOR_NAME: string = "ROCR";
    static INDICATOR_DESCR: string = "Rate of change ratio: (price/prevPrice)";
    static TIMEPERIOD_DEFAULT: number = 10;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;
    private periodHistory: indicators.Queue<number>;
    private periodCounter: number;

    constructor(timePeriod: number = ROCR.TIMEPERIOD_DEFAULT) {
        super(ROCR.INDICATOR_NAME, ROCR.INDICATOR_DESCR);

        if (timePeriod < ROCR.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, ROCR.TIMEPERIOD_MIN, timePeriod)));
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
            // RocR = price/previousPrice
            let previousPrice = this.periodHistory.peek();

            let result = 0;
            if (previousPrice !== 0) {
                result = inputData / previousPrice;
            }

            this.setCurrentValue(result);
        }

        if (this.periodHistory.count > this.timePeriod) {
            this.periodHistory.dequeue();
        }

        return this.isReady;
    }
}
