import * as indicators from "../";
import * as marketData from "../../data/market/";

export class CommodityChannelIndex
    extends indicators.AbstractIndicator<marketData.PriceBar> {

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

    constructor(timePeriod: number = CommodityChannelIndex.TIMEPERIOD_DEFAULT) {
        super(CommodityChannelIndex.INDICATOR_NAME, CommodityChannelIndex.INDICATOR_DESCR);

        if (timePeriod < CommodityChannelIndex.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, CommodityChannelIndex.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.typicalPriceHistory = new indicators.Queue<number>();
        this.factor = 0.015;
        this.periodCounter = this.timePeriod * -1;
        this.sma = new indicators.SMA(timePeriod);
        this.sma.on("data", (data: number) => { this.receiveSMAData(data); });

        this.setLookBack(timePeriod - 1);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        this.periodCounter += 1;

        // calculate the typical price
        this.currentTypicalPrice = (inputData.high + inputData.low + inputData.close) / 3;

        // push it to the history
        this.typicalPriceHistory.enqueue(this.currentTypicalPrice);

        // trim the history
        if (this.typicalPriceHistory.count > this.timePeriod) {
            this.typicalPriceHistory.dequeue();
        }

        // add it to the average
        this.sma.receiveData(this.currentTypicalPrice);

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

export class CCI extends CommodityChannelIndex {

}
