import * as indicators from "../";

export class MOM
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MOM";
    static INDICATOR_DESCR: string = "Momentum";
    static TIMEPERIOD_DEFAULT: number = 10;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private periodHistory: indicators.Queue<number>;
    private periodCounter: number;

    constructor(timePeriod: number = MOM.TIMEPERIOD_DEFAULT) {
        super(MOM.INDICATOR_NAME, MOM.INDICATOR_DESCR);

        if (timePeriod < MOM.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, MOM.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodCounter = timePeriod * -1;
        this.periodHistory = new indicators.Queue<number>();
        this.setLookBack(timePeriod);
    }

    receiveData(inputData: number): boolean {
        this.periodCounter += 1;
        this.periodHistory.enqueue(inputData);

        if (this.periodCounter > 0) {
            // Mom = price - previousPrice
            let previousPrice = this.periodHistory.peek();

            let result = inputData - previousPrice;

            this.setCurrentValue(result);
        }

        if (this.periodHistory.count > this.timePeriod) {
            this.periodHistory.dequeue();
        }

        return this.isReady;
    }
}
