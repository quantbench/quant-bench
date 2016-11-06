import * as indicators from "../";
import * as marketData from "../../data/market/";

export class WILLR
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "WILLR";
    static INDICATOR_DESCR: string = "Williams' %R";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;
    private periodHighHistory: indicators.Queue<number>;
    private periodLowHistory: indicators.Queue<number>;
    private periodCounter: number;

    constructor(timePeriod: number = WILLR.TIMEPERIOD_DEFAULT) {
        super(WILLR.INDICATOR_NAME, WILLR.INDICATOR_DESCR);

        if (timePeriod < WILLR.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, WILLR.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodCounter = timePeriod * -1;
        this.periodHighHistory = new indicators.Queue<number>();
        this.periodLowHistory = new indicators.Queue<number>();
        this.setLookBack(this.timePeriod - 1);

    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.periodCounter += 1;
        this.periodHighHistory.enqueue(inputData.high);
        this.periodLowHistory.enqueue(inputData.low);

        if (this.periodCounter >= 0) {
            let highestHigh = this.getQueueMax(this.periodHighHistory);
            let lowestLow = this.getQueueMin(this.periodLowHistory);
            this.setCurrentValue((highestHigh - inputData.close) / (highestHigh - lowestLow) * -100.0);
        }

        if (this.periodHighHistory.count >= this.timePeriod) {
            this.periodHighHistory.dequeue();
        }

        if (this.periodLowHistory.count >= this.timePeriod) {
            this.periodLowHistory.dequeue();
        }
        return this.isReady;
    }

    private getQueueMin(queue: indicators.Queue<number>) {
        let min = Number.MAX_VALUE;
        queue.toArray().forEach((value) => {
            if (min > value) {
                min = value;
            }
        });

        return min;
    }

    private getQueueMax(queue: indicators.Queue<number>) {
        let max = Number.MIN_VALUE;
        queue.toArray().forEach((value) => {
            if (max < value) {
                max = value;
            }
        });

        return max;
    }
}
