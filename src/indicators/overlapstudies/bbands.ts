import * as indicators from "../";
import { AbstractIndicator } from "../abstractIndicator";

export class BBANDS
    extends AbstractIndicator<number, indicators.TradingBand>
    implements indicators.IIndicator<number, indicators.TradingBand> {

    static BBANDS_INDICATOR_NAME: string = "BBANDS";
    static BBANDS_INDICATOR_DESCR: string = "Bollinger Bands";
    static BBANDS_TIMEPERIOD_DEFAULT: number = 5;
    static BBANDS_TIMEPERIOD_MIN: number = 2;

    sma: indicators.SMA;
    stdDev: indicators.STDDEV;
    currentSma: number;
    timePeriod: number;

    constructor(timePeriod: number) {
        super(BBANDS.BBANDS_INDICATOR_NAME, BBANDS.BBANDS_INDICATOR_DESCR);
        if (timePeriod === undefined) {
            this.timePeriod = BBANDS.BBANDS_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < BBANDS.BBANDS_TIMEPERIOD_MIN) {
                throw (new Error(indicators.generateMinTimePeriodError(this.name, BBANDS.BBANDS_TIMEPERIOD_MIN, timePeriod)));
            }
        }

        this.timePeriod = timePeriod;
        this.currentSma = 0;
        this.sma = new indicators.SMA(this.timePeriod);
        this.stdDev = new indicators.STDDEV(timePeriod);
        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {
        if (this.sma.receiveData(inputData)) {
            this.currentSma = this.sma.currentValue;
        }

        if (this.stdDev.receiveData(inputData)) {
            let upperBand = this.currentSma + 2 * this.stdDev.currentValue;
            let lowerBand = this.currentSma - 2 * this.stdDev.currentValue;
            this.setCurrentValue(new indicators.TradingBand(upperBand, this.sma.currentValue, lowerBand));
            this.setIsReady();
        }
        return this.isReady;
    }
}
