import { AbstractIndicator } from "../abstractIndicator";
import * as globals from "../globals";
import { IIndicator } from "../indicator";
import { EMA } from "../overlapstudies/ema";

export const DEMA_INDICATOR_NAME: string = "DEMA";
export const DEMA_TIMEPERIOD_DEFAULT: number = 30;
export const DEMA_TIMEPERIOD_MIN: number = 2;

export class DEMA
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    timePeriod: number;
    currentEMA: number;
    ema1: EMA;
    ema2: EMA;

    constructor(timePeriod: number) {
        super(DEMA_INDICATOR_NAME);
        if (timePeriod === undefined) {
            this.timePeriod = DEMA_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < DEMA_TIMEPERIOD_MIN) {
                throw (new Error(globals.generateMinTimePeriodError(this.name, DEMA_TIMEPERIOD_MIN, timePeriod)));
            }
        }

        this.timePeriod = timePeriod;
        this.ema1 = new EMA(timePeriod);
        this.ema2 = new EMA(timePeriod);
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
