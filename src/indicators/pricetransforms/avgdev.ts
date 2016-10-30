import * as indicators from "../";

export class AVGDEV
    extends indicators.AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    static INDICATOR_NAME: string = "AVGDEV";
    static INDICATOR_DESCR: string = "Average Deviation";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private periodHistory: indicators.Queue<number>;

    constructor(timePeriod: number = AVGDEV.TIMEPERIOD_DEFAULT) {
        super(AVGDEV.INDICATOR_NAME, AVGDEV.INDICATOR_DESCR);

        if (timePeriod < AVGDEV.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, AVGDEV.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodHistory = new indicators.Queue<number>();
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        this.periodHistory.enqueue(inputData);

        if (this.periodHistory.count >= this.timePeriod) {
            if (this.periodHistory.count > this.timePeriod) {
                this.periodHistory.dequeue();
            }
            let sum = 0;
            this.periodHistory.toArray().forEach((value) => {
                sum += value;
            });
            let deviation = 0;
            this.periodHistory.toArray().forEach((value) => {
                deviation += Math.abs(value - sum / this.timePeriod);
            });

            this.setCurrentValue(deviation / this.timePeriod);

            this.periodHistory.dequeue();
        }

        return this.isReady;
    }
}
