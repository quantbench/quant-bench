import { AbstractIndicator } from "../abstractIndicator";
import * as globals from "../globals";
import { IIndicator } from "../indicator";

export const EMA_INDICATOR_NAME: string = "EMA";
export const EMA_TIMEPERIOD_DEFAULT: number = 30;
export const EMA_TIMEPERIOD_MIN: number = 2;

export class EMA
    extends AbstractIndicator<number, number>
    implements IIndicator<number, number> {

    timePeriod: number;
    multiplier: number;
    periodCounter: number;
    previousEma: number;
    periodTotal: number;

    constructor(timePeriod: number) {
        super(EMA_INDICATOR_NAME);
        if (timePeriod === undefined) {
            this.timePeriod = EMA_TIMEPERIOD_DEFAULT;
        } else {
            if (timePeriod < EMA_TIMEPERIOD_MIN) {
                throw (new Error(globals.generateMinTimePeriodError(this.name, EMA_TIMEPERIOD_MIN, timePeriod)));
            }
        }

        this.timePeriod = timePeriod;
        this.multiplier = 2 / (timePeriod + 1);
        this.periodCounter = timePeriod * -1;
        this.periodTotal = 0;

        this.setLookBack(this.timePeriod - 1);
    }

    receiveData(inputData: number): boolean {

        this.periodCounter += 1;
        if (this.periodCounter < 0) {
            this.periodTotal += inputData;
        } else if (this.periodCounter === 0) {
            this.periodTotal += inputData;
            this.setCurrentValue(this.periodTotal / this.timePeriod);
            this.setIsReady();
        } else if (this.periodCounter > 0) {
            this.setCurrentValue((inputData - this.previousEma) * this.multiplier + this.previousEma);
        }
        this.previousEma = this.currentValue;
        return this.isReady;
    }
}
