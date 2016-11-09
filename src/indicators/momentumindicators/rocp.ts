import * as indicators from "../";

export class ROCP
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "ROCP";
    static INDICATOR_DESCR: string = "Rate of change Percentage: (price-prevPrice)/prevPrice";
    static TIMEPERIOD_DEFAULT: number = 10;
    static TIMEPERIOD_MIN: number = 1;

    public timePeriod: number;
    private periodHistory: indicators.Queue<number>;
    private periodCounter: number;

    constructor(timePeriod: number = ROCP.TIMEPERIOD_DEFAULT) {
        super(ROCP.INDICATOR_NAME, ROCP.INDICATOR_DESCR);

        if (timePeriod < ROCP.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, ROCP.TIMEPERIOD_MIN, timePeriod)));
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
            // RocP = (price - previousPrice)/previousPrice
            let previousPrice = this.periodHistory.peek();

            let result = 0;
            if (previousPrice !== 0) {
                result = (inputData - previousPrice) / previousPrice;
            }

            this.setCurrentValue(result);
        }

        if (this.periodHistory.count > this.timePeriod) {
            this.periodHistory.dequeue();
        }

        return this.isReady;
    }
}
