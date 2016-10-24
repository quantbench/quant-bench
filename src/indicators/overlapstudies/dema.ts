import * as indicators from "../";
import { AbstractIndicator } from "../abstractIndicator";

export const DEMA_INDICATOR_NAME: string = "DEMA";
export const DEMA_INDICATOR_DESCR: string = "Double Exponential Moving Average";
export const DEMA_TIMEPERIOD_DEFAULT: number = 30;
export const DEMA_TIMEPERIOD_MIN: number = 2;

export class DEMA
    extends AbstractIndicator<number, number>
    implements indicators.IIndicator<number, number> {

    timePeriod: number;
    currentEMA: number;
    ema1: indicators.EMA;
    ema2: indicators.EMA;

    constructor(timePeriod: number) {
        super(DEMA_INDICATOR_NAME, DEMA_INDICATOR_DESCR);
        if (timePeriod === undefined) {
            this.timePeriod = DEMA_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < DEMA_TIMEPERIOD_MIN) {
                throw (new Error(indicators.generateMinTimePeriodError(this.name, DEMA_TIMEPERIOD_MIN, timePeriod)));
            }
        }

        this.timePeriod = timePeriod;
        this.ema1 = new indicators.EMA(timePeriod);
        this.ema2 = new indicators.EMA(timePeriod);
        this.setLookBack(2 * (this.timePeriod - 1));
    }

    receiveData(inputData: number): boolean {
        if (this.ema1.receiveData(inputData)) {
            this.receiveEMA1Data(this.ema1.currentValue);
        }
        return this.isReady;
    }

    private receiveEMA1Data(inputData: number) {
        this.currentEMA = inputData;
        if (this.ema2.receiveData(inputData)) {
            this.receiveEMA2Data(this.ema2.currentValue);
        }
    }

    private receiveEMA2Data(inputData: number) {
        this.setCurrentValue((2 * this.currentEMA) - inputData);
        this.setIsReady();
    }
}
