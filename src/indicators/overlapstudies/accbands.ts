import * as indicators from "../";
import * as marketData from "../../data/market/";

export class ACCBANDS
    extends indicators.AbstractIndicatorBase<marketData.PriceBar> {

    static INDICATOR_NAME: string = "ACCBANDS";
    static INDICATOR_DESCR: string = "Acceleration Bands";
    static TIMEPERIOD_DEFAULT: number = 20;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private upperBandInternal: number;
    private middleBandInternal: number;
    private lowerBandInternal: number;

    private upperSMA: indicators.SMA;
    private middleSMA: indicators.SMA;
    private lowerSMA: indicators.SMA;

    constructor(timePeriod: number = ACCBANDS.TIMEPERIOD_DEFAULT) {
        super(ACCBANDS.INDICATOR_NAME, ACCBANDS.INDICATOR_DESCR);

        if (timePeriod < ACCBANDS.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, ACCBANDS.TIMEPERIOD_MIN, timePeriod)));
        }

        this.upperBandInternal = 0;
        this.middleBandInternal = 0;
        this.lowerBandInternal = 0;

        this.timePeriod = timePeriod;
        this.upperSMA = new indicators.SMA(this.timePeriod);
        this.middleSMA = new indicators.SMA(this.timePeriod);
        this.lowerSMA = new indicators.SMA(this.timePeriod);
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: marketData.PriceBar): boolean {
        let highPlusLow = inputData.high + inputData.low;
        let highMinusLow = inputData.high - inputData.low;
        let tempReal = 4 * highMinusLow / highPlusLow;

        this.middleSMA.receiveData(inputData.close);
        if (highPlusLow > 0) {
            this.upperSMA.receiveData(inputData.high * (1 + tempReal));
            this.lowerSMA.receiveData(inputData.low * (1 - tempReal));
        } else {
            this.upperSMA.receiveData(inputData.high);
            this.lowerSMA.receiveData(inputData.low);
        }

        if (this.middleSMA.isReady) {
            this.setCurrentValue(this.upperSMA.currentValue,
                this.middleSMA.currentValue,
                this.lowerSMA.currentValue);
        }

        return this.isReady;
    }

    public get upperBand(): number {
        return this.upperBandInternal;
    }

    public get middleBand(): number {
        return this.middleBandInternal;
    }

    public get lowerBand(): number {
        return this.lowerBandInternal;
    }

    protected setCurrentValue(upperBand: number, middleBand: number, lowerBand: number) {
        this.upperBandInternal = upperBand;
        this.middleBandInternal = middleBand;
        this.lowerBandInternal = lowerBand;
        this.emit("data", this.upperBand, this.middleBand, this.lowerBand);
        this.setIsReady();
    }
}
