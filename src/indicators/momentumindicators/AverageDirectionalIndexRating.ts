import * as indicators from "../";
import * as marketData from "../../data/market/";

export class AverageDirectionalIndexRating
    extends indicators.AbstractIndicator<marketData.PriceBar> {

    static INDICATOR_NAME: string = "ADXR";
    static INDICATOR_DESCR: string = "Average Directional Movement Index Rating";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private periodCounter: number;
    private adx: indicators.AverageDirectionalIndex;
    private periodHistory: indicators.Queue<number>;

    constructor(timePeriod: number = AverageDirectionalIndexRating.TIMEPERIOD_DEFAULT) {
        super(AverageDirectionalIndexRating.INDICATOR_NAME, AverageDirectionalIndexRating.INDICATOR_DESCR);

        if (timePeriod < AverageDirectionalIndexRating.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, AverageDirectionalIndexRating.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodCounter = 0;
        this.periodHistory = new indicators.Queue<number>();
        this.adx = new indicators.AverageDirectionalIndex(timePeriod);
        this.adx.on("data", (data: number) => this.receiveADXData(data));
        this.setLookBack(this.timePeriod - 1 + this.adx.lookback);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.periodCounter++;
        this.adx.receiveData(inputData);
        return this.isReady;
    }

    private receiveADXData(data: number) {
        this.periodHistory.enqueue(data);

        if (this.periodCounter > this.lookback) {
            this.setCurrentValue((data + this.periodHistory.peek()) / 2);
        }

        if (this.periodHistory.count >= this.timePeriod) {
            this.periodHistory.dequeue();
        }
    }
}

export class ADXR extends AverageDirectionalIndexRating {

}
