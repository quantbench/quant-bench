import * as indicators from "../";
import * as marketData from "../../data/market/";

export class WilliamsPercentR
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "WILLR";
    static INDICATOR_DESCR: string = "Williams' %R";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;
    private periodHighHistory: indicators.Queue<number>;
    private periodLowHistory: indicators.Queue<number>;
    private periodCounter: number;

    constructor(timePeriod: number = WilliamsPercentR.TIMEPERIOD_DEFAULT) {
        super(WilliamsPercentR.INDICATOR_NAME, WilliamsPercentR.INDICATOR_DESCR);

        if (timePeriod < WilliamsPercentR.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, WilliamsPercentR.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodCounter = timePeriod * -1;
        this.periodHighHistory = new indicators.Queue<number>();
        this.periodLowHistory = new indicators.Queue<number>();
        this.setLookBack(this.timePeriod - 1);

    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.periodCounter += 1;
        this.periodHighHistory.enqueue(inputData.high);
        this.periodLowHistory.enqueue(inputData.low);

        if (this.periodCounter >= 0) {
            let highestHigh = indicators.getQueueMax(this.periodHighHistory);
            let lowestLow = indicators.getQueueMin(this.periodLowHistory);
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
}

export class WILLR extends WilliamsPercentR {

}