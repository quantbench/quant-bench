import * as indicators from "../";

export class MidPoint
    extends indicators.AbstractIndicator<number> {

    static INDICATOR_NAME: string = "MIDPOINT";
    static INDICATOR_DESCR: string = "MidPoint over period";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;
    private periodHistory: indicators.Queue<number>;
    private highestValue: number;
    private lowestValue: number;

    constructor(timePeriod: number = MidPoint.TIMEPERIOD_DEFAULT) {
        super(MidPoint.INDICATOR_NAME, MidPoint.INDICATOR_DESCR);

        if (timePeriod < MidPoint.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, MidPoint.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodHistory = new indicators.Queue<number>();
        this.highestValue = 0;
        this.lowestValue = 0;
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        this.periodHistory.enqueue(inputData);

        if (this.periodHistory.count > this.timePeriod) {
            this.periodHistory.dequeue();
        }

        if (this.periodHistory.count >= this.timePeriod) {
            this.highestValue = Number.MIN_VALUE;
            this.lowestValue = Number.MAX_VALUE;

            this.periodHistory.toArray().forEach((value: number) => {
                if (this.highestValue < value) {
                    this.highestValue = value;
                }
                if (this.lowestValue > value) {
                    this.lowestValue = value;
                }
            });

            this.setCurrentValue((this.highestValue + this.lowestValue) / 2.0);
        }

        return this.isReady;
    }
}

export class MIDPOINT extends MidPoint {

}
