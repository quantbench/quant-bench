import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CCI
    extends indicators.AbstractIndicator<marketData.IPriceBar> {

    static INDICATOR_NAME: string = "CCI";
    static INDICATOR_DESCR: string = "Commodity Channel Index";
    static TIMEPERIOD_DEFAULT: number = 14;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private periodCounter: number;
    private sma: indicators.SMA;
    private factor: number;
    private typicalPriceHistory: indicators.Queue<number>;
    private currentTypicalPrice: number;

    constructor(timePeriod: number = CCI.TIMEPERIOD_DEFAULT) {
        super(CCI.INDICATOR_NAME, CCI.INDICATOR_DESCR);

        if (timePeriod < CCI.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, CCI.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.typicalPriceHistory = new indicators.Queue<number>();
        this.factor = 0.015;
        this.periodCounter = this.timePeriod * -1;
        this.sma = new indicators.SMA(timePeriod);
        this.sma.on("data", (data: number) => { this.receiveSMAData(data); });

        this.setLookBack(timePeriod - 1);
    }

    receiveData(inputData: marketData.IPriceBar): boolean {
        this.periodCounter += 1;

        // calculate the typical price
        let typicalPrice = (inputData.high + inputData.low + inputData.close) / 3;
        this.currentTypicalPrice = typicalPrice;

        // push it to the history
        this.typicalPriceHistory.enqueue(typicalPrice);

        // trim the history
        if (this.typicalPriceHistory.count > this.timePeriod) {
            this.typicalPriceHistory.dequeue();
        }

        // add it to the average
        this.sma.receiveData(typicalPrice);

        return this.isReady;
    }

    private receiveSMAData(data: number) {
        let meanDeviation = 0;
        // calculate the mean deviation
        this.typicalPriceHistory.toArray().forEach((typicalPrice) => {
            meanDeviation += Math.abs(typicalPrice - data);
        });

        meanDeviation /= this.timePeriod;
        this.setCurrentValue((this.currentTypicalPrice - data) / (this.factor * meanDeviation));
    }
}
