import * as indicators from "../";
import * as marketData from "../../data/market/";

export class ADXR
    extends indicators.AbstractIndicator<marketData.IPriceBar, number>
    implements indicators.IIndicator<marketData.IPriceBar, number> {

    static INDICATOR_NAME: string = "ADXR";
    static INDICATOR_DESCR: string = "Average Directional Movement Index Rating";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private periodCounter: number;
    private adx: indicators.ADX;
    private periodHistory: indicators.Queue<number>;

    constructor(timePeriod: number = ADXR.TIMEPERIOD_DEFAULT) {
        super(ADXR.INDICATOR_NAME, ADXR.INDICATOR_DESCR);

        if (timePeriod < ADXR.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, ADXR.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.periodCounter = 0;
        this.adx = new indicators.ADX(timePeriod);
        this.adx.on("data", (data: number) => this.receiveADXData(data));
        this.setLookBack(this.timePeriod - 1 + this.adx.lookback);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.periodCounter++;
        this.adx.receiveData(inputData);
        return this.isReady;
    }

    receiveADXData(data: number) {
        this.periodHistory.enqueue(data);

        if (this.periodCounter > this.lookback) {
            let adxN = this.periodHistory.peek();
            let result = (data + adxN) / 2;

            this.setCurrentValue(result);
        }

        if (this.periodHistory.count >= this.timePeriod) {
            this.periodHistory.dequeue();
        }
    }
}
