import * as indicators from "../";

export class BBANDS
    extends indicators.AbstractIndicator<number, indicators.TradingBand>
    implements indicators.IIndicator<number, indicators.TradingBand> {

    static INDICATOR_NAME: string = "BBANDS";
    static INDICATOR_DESCR: string = "Bollinger Bands";
    static TIMEPERIOD_DEFAULT: number = 5;
    static TIMEPERIOD_MIN: number = 2;

    public timePeriod: number;

    private sma: indicators.SMA;
    private stdDev: indicators.STDDEV;
    private currentSma: number;

    constructor(timePeriod: number = BBANDS.TIMEPERIOD_DEFAULT) {
        super(BBANDS.INDICATOR_NAME, BBANDS.INDICATOR_DESCR);

        if (timePeriod < BBANDS.TIMEPERIOD_MIN) {
            throw (new Error(indicators.generateMinTimePeriodError(this.name, BBANDS.TIMEPERIOD_MIN, timePeriod)));
        }

        this.timePeriod = timePeriod;
        this.currentSma = 0;
        this.sma = new indicators.SMA(this.timePeriod);
        this.sma.on("data", (data: number) => this.receiveSmaData(data));
        this.stdDev = new indicators.STDDEV(timePeriod);
        this.stdDev.on("data", (data: number) => this.receiveStdDevData(data));
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        this.sma.receiveData(inputData);

        this.stdDev.receiveData(inputData);
        return this.isReady;
    }

    private receiveSmaData(data: number) {
        this.currentSma = data;
    }

    private receiveStdDevData(data: number) {
        let upperBand = this.currentSma + 2 * data;
        let lowerBand = this.currentSma - 2 * data;
        this.setCurrentValue(new indicators.TradingBand(upperBand, this.sma.currentValue, lowerBand));
    }
}
